const prevBtn = document.querySelectorAll("button.prev")
const nextBtn = document.querySelectorAll("button.next")
const articleOne = document.querySelector(".article-one")
const articleTwo = document.querySelector(".article-two")

nextBtn.forEach((btn) => {
  btn.onclick = () => {
    articleOne.classList.toggle("hide")
    articleTwo.classList.toggle("hide")
  }
})

prevBtn.forEach((btn) => {
  btn.onclick = () => {
    articleOne.classList.toggle("hide")
    articleTwo.classList.toggle("hide")
  }
})
