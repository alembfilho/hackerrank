// Sales by Match
// There is a large pile of socks that must be paired by color. 
// Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.
function sockMerchant(n, ar) {
  const hash = {}
  ar.forEach(v => hash[v] = ++hash[v] || 1)
  return Object.values(hash).reduce((t, v) => t + Math.floor(v / 2), 0)
}

// Counting Valleys
function countingValleys(steps, path) {
  let valleys = 0, level = 0

  for (let s of path) {
    level += s == 'D' ? -1 : 1
    if (!level && s == 'U') valleys++
  }

  return valleys
}

// Jumping on the Clouds
function jumpingOnClouds(c) {
  let i = 0, jumps = 0

  while (i < c.length - 1) {
    jumps++
    i += 1 + !c[i + 2]
  }

  return jumps
}

// Repeated String
function repeatedString(s, n) {
  const mult = Math.floor(n / s.length),
    mod = n % s.length
  return mult * (s.match(/a/g) || []).length + (s.slice(0, mod).match(/a/g) || []).length
}