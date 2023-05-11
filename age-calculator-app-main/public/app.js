const submitBtn = document.querySelector("button")
const day = document.querySelector(".day")
const month = document.querySelector(".month")
const year = document.querySelector(".year")

submitBtn.onclick = () => {
  console.log(!day.value, !month.value, !year.value)
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
  return true
}

const isValidYear = () => {
  if (year.value > new Date().getFullYear()) {
    year.classList.add("error")
    year.nextElementSibling.textContent = "Must be in past"
  }
}

const isValidMonth = () => {
  if (month.value > 12 || month.value === 0) {
    month.classList.add("invalid")
  }
}

const isValidDay = () => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }
  if (day.value === 0 || day.value > getDaysInMonth(year.value, month.value)) {
    console.log("invalid")
    day.classList.add("invalid")
    return
  }

  return true
}

const calculateCurrentAge = (birthDay, birthMonth, birthYear) => {
  const today = new Date()
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay)
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  const year = age
  const day = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const months = month < 0 ? month + 12 : month
  return { year, months, day }
}
