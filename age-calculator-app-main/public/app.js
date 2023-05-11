const submitBtn = document.querySelector("button")
const day = document.querySelector(".day")
const month = document.querySelector(".month")
const year = document.querySelector(".year")

const outputYears = document.querySelector(".years")
const outputMonths = document.querySelector(".months")
const outputdays = document.querySelector(".days")

submitBtn.onclick = () => {
  if (!isEmpty() && isValidYear() && isValidMonth() && isValidDay()) {
    document
      .querySelectorAll("input")
      .forEach((el) => el.classList.remove("error"))
    const { years, months, days } = calculateCurrentAge(
      day.value,
      month.value,
      year.value
    )
    outputYears.textContent = years
    outputMonths.textContent = months
    outputdays.textContent = days
  } else {
    day.nextElementSibling.textContent = "Must be a valid date"
    day.classList.add("error")
  }
}

const isEmpty = () => {
  const formatControl = (controlName) => {
    controlName.classList.add("error")
    controlName.nextElementSibling.textContent = "This field is required"
  }
  if (!day.value) {
    formatControl(day)
  }
  if (!month.value) {
    formatControl(month)
  }
  if (!year.value) {
    formatControl(year)
  }
  if (day.value && month.value && year.value) {
    return false
  }
  return true
}

const isValidYear = () => {
  if (year.value > new Date().getFullYear()) {
    year.classList.add("error")
    year.nextElementSibling.textContent = "Must be in past"
    return false
  }
  return true
}

const isValidMonth = () => {
  if (month.value > 12 || month.value == 0) {
    month.classList.add("invalid")
    return false
  }
  return true
}

const isValidDay = () => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }
  if (day.value == 0 || day.value > getDaysInMonth(year.value, month.value)) {
    day.classList.add("invalid")
    return false
  }

  return true
}

const calculateCurrentAge = (birthDay, birthMonth, birthYear) => {
  const today = new Date()
  const birthdate = new Date(birthYear, birthMonth - 1, birthDay)
  const ageDelta = today - birthdate
  const years = Math.floor(ageDelta / 1000 / 60 / 60 / 24 / 365)
  const months = Math.floor(ageDelta / 1000 / 60 / 60 / 24 / 30) % 12
  const days = Math.floor(ageDelta / 1000 / 60 / 60 / 24) % 30
  return { years, months, days }
}
