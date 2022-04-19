async function teamGoals(team, year, num) {
  let goals = 0
  const { data } = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team${num}=${team}&page=1`)

  const promises = []
  for (let i = 1; i <= data.total_pages; i++) {
    promises.push(axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team${num}=${team}&page=${i}`))
  }

  const resArr = await axios.all(promises)

  resArr.forEach(res => {
    for (let m of res.data.data)
      goals += +m[`team${num}goals`]
  })

  return goals
}

async function getTotalGoals(team, year) {
  const [g1, g2] = await axios.all([teamGoals(team, year, 1), teamGoals(team, year, 2)])
  return g1 + g2
}

async function getNumDraws(year) {
  let draws = 0
  const { data } = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=1`)

  const promises = []
  for (let i = 1; i <= data.total_pages; i++) {
    promises.push(axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${i}`))
  }

  const pageRes = await axios.all(promises)

  pageRes.forEach(res => {
    for (let m of res.data.data)
      if (m.team1goals == m.team2goals) draws++
  })

  return draws
}

async function getTeams(year, k) {
  // write your code here
  // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>
  const res = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=1`)

  const tp = res.data.total_pages

  const dict = {}

  for (let i = 1; i <= tp; i++) {
    const r = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${i}`)

    r.data.data.forEach(data => {
      dict[data.team1] = ++dict[data.team1] || 1
      dict[data.team2] = ++dict[data.team2] || 1
    })
  }

  return Object.entries(dict).filter(([t, q]) => q >= k).map(([t, q]) => t).sort()

}