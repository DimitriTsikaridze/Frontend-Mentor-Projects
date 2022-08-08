const adviceId = document.querySelector("#advice-id")
const quote = document.querySelector(".quote")
const diceButton = document.querySelector(".dice-button")
const advice_api = "https://api.adviceslip.com/advice"

document.addEventListener("DOMContentLoaded", () => generateRandomQuote())
diceButton.addEventListener("click", () => generateRandomQuote())

const generateRandomQuote = async () => {
  const res = await fetch(advice_api)
  const { slip } = await res.json()
  adviceId.textContent = slip.id
  quote.textContent = `"${slip.advice}"`
}
