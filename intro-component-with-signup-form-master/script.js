const button = document.querySelector(".register");
const inputs = document.querySelectorAll("input");
const errorDivs = document.querySelectorAll(".error-div");
button.addEventListener("click", () => {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      inputs[i].classList.add("input-error");
      errorDivs[i].classList.remove("hide");
    } else {
      inputs[i].classList.remove("input-error");
      errorDivs[i].classList.add("hide");
    }
  }
});
