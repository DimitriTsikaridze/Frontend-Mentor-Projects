const bill = document.querySelector(".bill");
const tipButtons = document.querySelectorAll(".grid-item>button");
const people = document.querySelector(".people");
const tipAmount = document.querySelector(".tip-value");
const totalAmount = document.querySelector(".total-value");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");
const calculateBtn = document.querySelector(".calcBtn");

let tip = 0;

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      btn.classList.add("inactive");
    } else {
      tipButtons.forEach((e) => {
        e.classList.remove("active");
      });
      tip = parseInt(btn.textContent);
      btn.classList.remove("inactive");
      btn.classList.add("active");
    }
  });
});

function calculateBill() {
  if (bill.value && people.value != 0 && tip) {
    let tipPercent = (bill.value * tip) / 100 / people.value;
    tipAmount.textContent = `\$${tipPercent}`;
  } else {
    alert("All Fields Are Required");
  }
}

function calculateTotal() {
  if (bill.value && people.value != 0 && tip) {
    let totalPerPerson = parseInt(bill.value) + (bill.value * tip) / 100;
    let res = parseInt(totalPerPerson) / people.value;
    totalAmount.textContent = `\$${res}`;
  }
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

people.addEventListener("input", () => {
  if (!people.value || people.value == 0) {
    addError();
  } else {
    removeError();
  }
});

calculateBtn.addEventListener("click", () => {
  calculateBill();
  calculateTotal();
});
