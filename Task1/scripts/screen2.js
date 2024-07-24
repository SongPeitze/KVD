document.addEventListener("DOMContentLoaded", function () {
  // Function to validate the form
  function validateForm() {
    var isValid = true;
    var countryCodeError = document.getElementById("countryCodeError");
    var mobileNumberError = document.getElementById("mobileNumberError");

    // Validate country code
    if (document.getElementById("countryCode").value === "") {
      countryCodeError.textContent = "Please select a country code.";
      isValid = false;
    } else {
      countryCodeError.textContent = "";
    }

    // Validate mobile number
    var mobileNumber = document.getElementById("mobileNumber").value;
    var mobileNumberPattern = /^\d{8,10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      mobileNumberError.textContent =
        "Please enter a valid phone number (8 to 10 digits).";
      isValid = false;
    } else {
      mobileNumberError.textContent = "";
    }

    return isValid;
  }

  // Handle form submission
  document
    .getElementById("toScreen3")
    .addEventListener("click", function (event) {
      if (!validateForm()) {
        event.preventDefault(); // Prevent navigation if validation fails
      } else {
        window.location.href = "screen3.html"; // Navigate if validation succeeds
      }
    });

  // Adding error message containers
  var countryCodeError = document.createElement("div");
  countryCodeError.id = "countryCodeError";
  countryCodeError.className = "error-message";
  document
    .getElementById("countryCode")
    .parentElement.appendChild(countryCodeError);

  var mobileNumberError = document.createElement("div");
  mobileNumberError.id = "mobileNumberError";
  mobileNumberError.className = "error-message";
  document
    .getElementById("mobileNumber")
    .parentElement.appendChild(mobileNumberError);
});
