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
      answers[i].classList.add("hide");
      answers[i].classList.remove("clicked");
      listElemenets[i].classList.remove("bold");
      arrows[i].classList.remove("rotate");
    } else {
      answers[i].classList.remove("hide");
      answers[i].classList.add("clicked");
      listElemenets[i].classList.add("bold");
      arrows[i].classList.add("rotate");
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
