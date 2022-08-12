const days = document.querySelectorAll(".day-name")
const dayBoxes = document.querySelectorAll(".spent-box")

const fetchData = async () => {
  const data = await (await fetch("./data.json")).json()
  const sortByAmount = (a, b) => a.amount - b.amount

  const highest = [...data].sort(sortByAmount).at(-1)
  const highestIdx = data.findIndex((v) => v.amount === highest.amount)

  dayBoxes[highestIdx].classList.add("highest")

  data.forEach(({ amount }, idx) => {
    dayBoxes[idx].style.height = `${amount * 3}px`
    dayBoxes[idx].setAttribute("data-value", `$ ${amount}`)
  })
}

fetchData()
