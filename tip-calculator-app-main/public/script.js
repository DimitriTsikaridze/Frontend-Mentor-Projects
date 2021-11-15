const tipButtons = document.querySelectorAll(".grid-item>button");
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
let tipAmount = document.querySelector(".tip-value");
let totalAmount = document.querySelector(".total-value");

function tipValues() {
  tipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      return parseInt(btn.textContent);
    });
  });
}

function billValue() {
  bill.addEventListener("input", (num) => {
    calculateBill(num.target.value);
  });
}

function peopleValue() {
  people.addEventListener("input", (amount) => {
    calculateTotal(amount.target.value);
  });
}

function calculateBill(num) {
  tipAmount.textContent = `\$${num}`;
}

function calculateTotal(amount) {
  totalAmount.textContent = `\$${amount}`;
}

billValue();
peopleValue();
