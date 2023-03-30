const loadJobs = async () => {
  const jobs = await (await fetch("data.json")).json()
}

loadJobs()
