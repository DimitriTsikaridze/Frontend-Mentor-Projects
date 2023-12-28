const articles = document.querySelectorAll("article");

articles.forEach((article) => {
  article.addEventListener("click", () => {
    article.classList.toggle("active");
  });
});
