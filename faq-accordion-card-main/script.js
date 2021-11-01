const questions = document.querySelectorAll(".question-div");
const answers = document.querySelectorAll(".answer");
const listElemenets = document.querySelectorAll("li");
const arrows = document.querySelectorAll(".arrows");
const mobileImg = document.querySelector(".mobile-img");
const mobileBg = document.querySelector(".mobile-bg");
const attribution = document.querySelector(".attribution");
for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", () => {
    if (answers[i].classList.contains("clicked")) {
      answers[i].classList.toggle("hide");
      answers[i].classList.toggle("clicked");
      listElemenets[i].classList.toggle("bold");
      arrows[i].classList.toggle("rotate");
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 920) {
    mobileImg.classList.remove("hide");
    mobileBg.classList.remove("hide");
  } else {
    mobileImg.classList.add("hide");
    mobileBg.classList.add("hide");
    attribution.classList.add("hide");
  }
});

if (window.innerWidth <= 920) {
  mobileImg.classList.toggle("hide");
  mobileBg.classList.toggle("hide");
}
