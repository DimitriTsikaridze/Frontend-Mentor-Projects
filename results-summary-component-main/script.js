const loadSummary = async () => {
  const data = await (await fetch("data.json")).json()
  const summaryItems = document.querySelector(".summary-items")

  data.forEach(({ category, score, icon }) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <p>
    <img src="${icon}" alt="icon svg" />
    ${category}</p>
    <h3>${score} <span>/100</span></h3>
    `
    summaryItems.appendChild(div)
  })
}

loadSummary()
