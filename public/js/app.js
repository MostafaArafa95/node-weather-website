const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "From JS";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  search(searchInput.value);
});

const search = address => {
  fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(
      address.trim()
    )}`
  ).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
};
