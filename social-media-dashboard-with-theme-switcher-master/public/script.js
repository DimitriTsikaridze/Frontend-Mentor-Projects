const toggleBtn = document.getElementById("toggle")

toggleBtn.onclick = () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.replace("light", "dark")
  } else {
    document.body.classList.replace("dark", "light")
  }
}
