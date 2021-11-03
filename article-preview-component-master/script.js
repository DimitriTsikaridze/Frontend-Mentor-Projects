const shareTabOpen = document.querySelector(".information");
const shareTabClosed = document.querySelector(".share-items");

const desktopShare = document.querySelector(".desktop-share");
const shareIcon = document.querySelector(".share");

shareTabOpen.addEventListener("click", () => {
  if (window.innerWidth < 768) {
    shareTabOpen.style.display = "none";
    shareTabClosed.style.display = "flex";
  }
});

shareTabClosed.addEventListener("click", () => {
  if (window.innerWidth < 768) {
    shareTabClosed.style.display = "none";
    shareTabOpen.style.display = "flex";
  }
});

shareIcon.addEventListener("click", () => {
  if (window.innerWidth > 767) {
    desktopShare.classList.toggle("show");
  }
});
