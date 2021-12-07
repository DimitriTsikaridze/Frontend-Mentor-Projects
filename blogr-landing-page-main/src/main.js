const hamburgerBtn = document.querySelector(".show-hamburger");
const modal = document.querySelector(".show-ul");
const closeBtn = document.querySelector(".close-icon");
hamburgerBtn.addEventListener("click", () => {
  modal.classList.toggle("show-ul");
  closeBtn.classList.toggle("hide-close-btn");
  hamburgerBtn.classList.add("hide-close-btn");
});

closeBtn.addEventListener("click", () => {
  modal.classList.toggle("show-ul");
  closeBtn.classList.toggle("hide-close-btn");
  hamburgerBtn.classList.remove("hide-close-btn");
});
