const backProjectBtn = document.querySelector(".back-project-btn");
const backProjectModal = document.querySelector(".section-1-modal");
const overlay = document.querySelector(".overlay");
backProjectBtn.addEventListener("click", () => {
  overlay.classList.remove("hide");
  backProjectModal.classList.remove("hide");
});
