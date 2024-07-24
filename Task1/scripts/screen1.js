document.addEventListener("DOMContentLoaded", function () {
  var buttons = [
    { malay: "Pascabayar", english: "Postpaid" },
    { malay: "Peranti Rumah", english: "Home Fibre" },
    { malay: "Tawaran Korporat", english: "Corporate Deals" },
    { malay: "Perkhidmatan lain-lain", english: "Other Services" },
  ];

  var buttonContainer = document.getElementById("buttonContainer");

  // Create buttons and click event to navigate to screen2.html
  buttons.forEach(function (button) {
    var buttonElement = document.createElement("button");
    buttonElement.className = "yellow-btn mt-3";
    buttonElement.innerHTML = `
            <div class="button-text">
                <span class="bold-text">${button.malay}</span>
                <span>${button.english}</span>
            </div>
        `;
    buttonElement.onclick = function () {
      window.location.href = "screen2.html";
    };
    buttonContainer.appendChild(buttonElement);
  });
});
