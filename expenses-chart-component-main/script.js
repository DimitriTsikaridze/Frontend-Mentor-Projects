const days = document.querySelectorAll(".day-name")
const dayBoxes = document.querySelectorAll(".spent-box")

const fetchData = async () => {
  const res = await fetch("./data.json")
  const data = await res.json()
  data.forEach(({ amount }, idx) => {
    dayBoxes[idx].style.height = `${amount * 3}px`
    console.log(amount)
  })
}

fetchData()
