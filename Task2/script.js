document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  let startIndex = 0;
  const rowsPerPage = 10;
  const updateInterval = 1200; // 2 minutes in milliseconds

  // Function to fetch data from the JSON file
  function fetchData() {
    fetch("exchange_rates.json")
      .then((response) => response.json())
      .then((json) => {
        data = json.rates;
        document.getElementById(
          "last-updated"
        ).textContent = `Last updated: ${json.last_update}`;
        displayRows();
        setInterval(displayRows, updateInterval);
      });
  }

  // Function to display rows
  function displayRows() {
    const tbody = document
      .getElementById("exchange-rates")
      .getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Clear previous rows

    const endIndex = (startIndex + rowsPerPage) % data.length;
    const range =
      startIndex < endIndex
        ? data.slice(startIndex, endIndex)
        : data.slice(startIndex).concat(data.slice(0, endIndex));

    range.forEach((rate) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${rate[0]}</td>
          <td>${rate[1]}</td>
          <td>${rate[2]}</td>
          <td>${rate[3]}</td>
        `;
      tbody.appendChild(row);
    });

    startIndex = (startIndex + rowsPerPage) % data.length; // Update startIndex
  }

  // Initial fetch
  fetchData();
});
