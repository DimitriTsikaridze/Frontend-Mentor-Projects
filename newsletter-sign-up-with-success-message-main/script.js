const subscribeBtn = document.getElementById('subscribe')
const errorText = document.getElementById('error-text')
const email = document.getElementById('email')
const form = document.getElementById('subscribe-form')
const successCard = document.getElementById('success')
const dismissBtn = document.getElementById('dismiss')

subscribeBtn.onclick = () => {
  if (validateEmail(email.value)) {
    form.classList.add('hide')
    successCard.classList.remove('hide')
  } else {
    addErrorStates(errorText, email)
  }
}

dismissBtn.onclick = () => {
  form.classList.remove('hide')
  successCard.classList.add('hide')
}

email.oninput = () => clearErrors(errorText, email)

function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email)
}

function addErrorStates(text, email) {
  text.classList.remove('hide')
  email.classList.add('error')
}

function clearErrors(text) {
  text.classList.add('hide')
  email.classList.remove('error')
}
