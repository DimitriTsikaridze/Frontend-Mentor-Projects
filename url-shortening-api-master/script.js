const shortenBtn = document.querySelector(".shorten-btn")
const url = document.querySelector(".shorten-link-input").value
const copyBtns = document.querySelectorAll(".copy-btn")

const shortenedLinksContainer = document.querySelector(".shortened-links")

const textError = document.querySelector(".error")
const inputError = document.querySelector(".shorten-link-input")

shortenBtn.addEventListener("click", async () => {
  // shortenedLinksContainer.innerHTML = createLinkPreview(
  //   "full link",
  //   "short link",
  //   0
  // )
})

const shortenLink = async (url) => {
  if (!url) {
    setErrors()
    return
  }
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
  const {
    result: { full_short_link: link },
  } = await res.json()
  return { url, link }
}

copyBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const shortLinkURL = document.querySelector(`.link-${idx}`)
    copyBtns[idx].textContent = "Copied"
    copyBtns[idx].classList.add("copied")
    setTimeout(() => {
      copyBtns[idx].textContent = "Copy"
      copyBtns[idx].classList.remove("copied")
    }, 2000)
    window.navigator.clipboard.writeText(shortLinkURL.textContent)
  })
})

const setErrors = () => {
  textError.removeAttribute("hidden")
  inputError.classList.add("input-error")
}

const createLinkPreview = (fullLink, shortLink, idx) => {
  const linkPreview = `
     <div class="link-preview">
            <h4 class="full-link">${fullLink}</h4>
            <h4 class="short-link">
              <a _blank class="link-${idx}" href="${shortLink}"
                >${shortLink}/</a
              >
            </h4>
            <button class="copy-btn">Copy</button>
          </div>
  `
  return linkPreview
}
