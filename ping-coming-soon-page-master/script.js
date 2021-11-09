const btn = document.querySelector(".subscribe-btn");
const email = document.querySelector("input");
const errorText = document.querySelector(".error-text");
btn.addEventListener("click", () => {
  checkEmail();
});

function checkEmail() {
  if (!email.value || !validateEmail(email.value)) {
    btn.classList.add("blur");
    email.classList.add("error");
    errorText.classList.remove("hide");
  } else {
    btn.classList.remove("blur");
    email.classList.remove("error");
    errorText.classList.add("hide");
    alert("Successfully registered");
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
