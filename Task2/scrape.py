import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
import json

url = 'https://www.hsbc.com.my/investments/products/foreign-exchange/currency-rate/'

def get_exchange_rates():
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any errors

        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all tables on the page
        tables = soup.find_all('table')

        data = []
        for table in tables:
            rows = table.find_all('tr')
            for i, row in enumerate(rows[1:], start=1):  # Skip the first row (headers)
                cols = row.find_all(['th', 'td'])
                if len(cols) >= 4:
                    currency = cols[0].text.strip()
                    currency_name = cols[1].text.strip()
                    sell_rate = cols[2].text.strip()
                    buy_rate = cols[3].text.strip()

                    print(f"{currency:<30}{currency_name:<20}{buy_rate:<15}{sell_rate:<15}")

                    data.append((currency, currency_name, buy_rate, sell_rate))

        return data

    except Exception as e:
        print(f"Error: {e}")
        return []

def generate_json(data, last_update):
    json_content = {
        'last_update': last_update.strftime('%Y-%m-%d %H:%M:%S'),
        'rates': data
    }
    with open('exchange_rates.json', 'w') as file:
        json.dump(json_content, file, indent=4)

def display_exchange_rates(data, start_index):
    print(f"\nExchange Rates (Displaying rows {start_index + 1} to {min(start_index + 10, len(data))}):\n")
    print(f"{'Country Name':<30}{'Country Flag':<20}{'Buy Rate':<15}{'Sell Rate':<15}")
    print("-" * 80)

    for i in range(start_index, min(start_index + 10, len(data))):
        currency, currency_name, buy_rate, sell_rate = data[i]
        print(f"{currency:<20}{currency_name:<30}{buy_rate:<15}{sell_rate:<15}")

if __name__ == "__main__":
    last_update = datetime.now()
    data = get_exchange_rates()
    start_index = 0

    while True:
        print(f"Last updated: {last_update.strftime('%Y-%m-%d %H:%M:%S')}")
        print("Exchange Rates (HSBC Malaysia):")
        display_exchange_rates(data, start_index)
        generate_json(data, last_update)
        print("-" * 50)

        # Cycle list to display the next 10 rows
        start_index += 10
        if start_index >= len(data):
            start_index = 0  # Reset to start from the beginning
        # Wait for 2 minutes before displaying the next set
        time.sleep(20)

        # Update data every hour
        current_time = datetime.now()
        if (current_time - last_update).seconds >= 3600:
            data = get_exchange_rates()
            last_update = current_time
            start_index = 0  # Reset to start from the beginning of the updated list
