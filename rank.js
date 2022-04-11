

function climbingLeaderboard(ranked, player) {
  const rank = [ranked[0]], scores = []
  for (let r of ranked) if (rank[rank.length - 1] != r) rank.push(r)

  const binarySearch = (arr, v, ini, end) => {
    while (true) {
      if (arr[ini] < v) return ini
      if (arr[end] > v) return end + 1
      if (ini == end) return ini

      const m = Math.floor((end - ini) / 2) + ini
      if (arr[m] == v) return m

      if (v < arr[m]) ini = m + 1
      else end = m - 1
    }
  }

  let ini = 0, end = rank.length - 1, np = false
  for (let i = 0; i < player.length; i++) {
    const p = player[i]

    if (np) {
      scores.push(scores[scores.length - 1])
      np = false
    } else {
      const pos = binarySearch(rank, p, ini, end)
      if (pos == rank.length) {
        rank.push(p)
        scores.push(rank.length)
      } else {
        if (p > rank[pos]) rank.splice(pos, 0, p)
        scores.push(pos + 1)
      }

    }

    const nextP = player[Math.min(i + 1, player.length)]
    if (nextP == p) { np = true; continue }
    if (nextP < p) ini = scores[scores.length - 1]
    else end = scores[scores.length - 1]

  }

  return scores
}

console.time()
console.log(climbingLeaderboard(input, player)[0])
console.timeEnd()