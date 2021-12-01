const toggleBtn = document.querySelector(".hamburger-img");
const modal = document.querySelector(".links");
toggleBtn.addEventListener("click", () => {
  modal.classList.toggle("showModal");
});
