const tipButtons = document.querySelectorAll(".grid-item>button");
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const tipAmount = document.querySelector(".tip-value");
const totalAmount = document.querySelector(".total-value");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

function tipValues() {
  tipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(parseInt(btn.textContent));
      return parseInt(btn.textContent);
    });
  });
}

function calculateBill(num) {
  tipAmount.textContent = `\$${num}`;
}

function calculateTotal(amount) {
  totalAmount.textContent = `\$${amount}`;
}

function billValue() {
  bill.addEventListener("input", (num) => {
    calculateBill(num.target.value);
  });
}

function peopleValue() {
  let zeroAmount = 0;
  people.addEventListener("input", (amount) => {
    if (amount.target.value == "0") {
      addError();
      amount.preventDefault();
    } else {
      removeError();
      calculateTotal(amount.target.value);
    }
  });
}

function addError() {
  people.parentNode.classList.remove("hover-green");
  people.parentNode.classList.add("hover-red");
  error.classList.remove("hide");
}
function removeError() {
  people.parentNode.classList.remove("hover-red");
  people.parentNode.classList.add("hover-green");
  error.classList.add("hide");
}

function reset() {
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
}

billValue();
peopleValue();
resetBtn.addEventListener("click", () => {
  reset();
});
