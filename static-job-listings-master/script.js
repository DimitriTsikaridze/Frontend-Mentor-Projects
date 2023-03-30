const jobsContainer = document.querySelector(".jobs-container")

const searchTerms = []

const loadJobs = async () => {
  const jobs = await (await fetch("data.json")).json()
  jobs.forEach((job) => {
    const article = document.createElement("article")
    job.featured ? article.classList.add("featured-job") : null
    const div = document.createElement("div")
    job.languages.forEach((lang) => {
      const span = document.createElement("span")
      span.innerHTML = lang
      div.appendChild(span)
    })

    article.innerHTML = `
      <img src="${job.logo}" alt="logo image"/>
      <div>
        <h3>${job.company} 
        ${job.new ? "<span class='new'>NEW!</span>" : ""} 
        ${job.featured ? "<span class='featured'>FEATURED</span>" : ""} 
        </h3>
        <h2>${job.position}</h2>
        <h4>
          <span>${job.postedAt}</span>
          <span>${job.contract}</span>
          <span>${job.location}</span>
        </h4>
      </div>
  `
    article.appendChild(div)
    jobsContainer.appendChild(article)
  })
  const languages = document.querySelectorAll(".languages")
}

loadJobs()
