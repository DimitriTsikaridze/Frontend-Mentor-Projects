const bill = document.querySelector(".bill");
const tipButtons = document.querySelectorAll(".grid-item>button");
const people = document.querySelector(".people");
const tipAmount = document.querySelector(".tip-value");
const totalAmount = document.querySelector(".total-value");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

let tip = 0,
  amt = 0,
  ppl = 1;

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      tip = 0;
      btn.classList.remove("active");
      btn.classList.add("unactive");
    } else {
      tipButtons.forEach((e) => {
        e.classList.remove("active");
      });
      tip = btn.value;
      btn.classList.remove("unactive");
      btn.classList.add("active");
    }
  });
});

function calculateBill(bill) {
  tipAmount.textContent = `\$${bill}`;
  console.log((bill * tipValue()) / 100 / people);
}

function calculateTotal(amount) {
  totalAmount.textContent = `\$${amount}`;
}

function billValue() {
  bill.addEventListener("input", (bill) => {
    calculateBill(bill.target.value);
  });
}

function peopleValue() {
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

resetBtn.addEventListener("click", () => {
  reset();
});
