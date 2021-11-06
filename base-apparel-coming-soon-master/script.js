const button = document.querySelector("button");
const email = document.querySelector("input");
const valid = document.querySelector(".valid");
const invalid = document.querySelector(".invalid");
const errorLogo = document.querySelector(".error-img");

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEmail(email.value)) {
    errorLogo.classList.add("hide");
    invalid.classList.add("hide");
    valid.classList.remove("hide");
  } else {
    errorLogo.classList.remove("hide");
    valid.classList.add("hide");
    invalid.classList.remove("hide");
  }
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
