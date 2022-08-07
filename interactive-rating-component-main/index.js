const ratingButtons = document.querySelectorAll(".rating-button")
const ratingCard = document.querySelector(".rating-card")
const thankYouCard = document.querySelector(".thank-you-card")
const submitButton = document.querySelector(".submit-button")
const ratingSpan = document.querySelector("#selected-amount")
let rating = 5

ratingButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    ratingButtons.forEach((btn) => {
      btn.classList.contains("active") && btn.classList.remove("active")
    })
    btn.classList.add("active")
    rating = btn.textContent
  })
})

submitButton.addEventListener("click", () => {
  ratingCard.classList.add("hide")
  thankYouCard.classList.remove("hide")
  ratingSpan.textContent = rating
  console.log(rating)
})
