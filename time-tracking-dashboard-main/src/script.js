//links
const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");

//titles
const titles = document.querySelectorAll(".activity-title");
//current Time
const currentTime = document.querySelectorAll(".current-time");
//previous Time
const previousTime = document.querySelectorAll(".previous-time");

dailyBtn.addEventListener("click", () => {
  daily();
});
weeklyBtn.addEventListener("click", () => {
  weekly();
});
monthlyBtn.addEventListener("click", () => {
  monthly();
});

async function daily() {
  const response = await (await fetch("../data.json")).json();
  for (let i = 0; i < response.length; i++) {
    titles[i].textContent = response[i].title;
    currentTime[i].textContent = `${response[i].timeframes.daily.current}hrs`;
    previousTime[
      i
    ].textContent = `Last Day - ${response[i].timeframes.daily.previous}hrs`;
  }
}

async function weekly() {
  const response = await (await fetch("../data.json")).json();
  for (let i = 0; i < response.length; i++) {
    titles[i].textContent = response[i].title;
    currentTime[i].textContent = `${response[i].timeframes.weekly.current}hrs`;
    previousTime[
      i
    ].textContent = `Last Week - ${response[i].timeframes.weekly.previous}hrs`;
  }
}
async function monthly() {
  const response = await (await fetch("../data.json")).json();
  for (let i = 0; i < response.length; i++) {
    titles[i].textContent = response[i].title;
    currentTime[i].textContent = `${response[i].timeframes.monthly.current}hrs`;
    previousTime[
      i
    ].textContent = `Last Month - ${response[i].timeframes.monthly.previous}hrs`;
  }
}
