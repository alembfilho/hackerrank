// Sales by Match
// There is a large pile of socks that must be paired by color.
// Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.
function sockMerchant(n, ar) {
  const hash = {}
  let sum = 0

  ar.forEach(v => ++hash[v] || (hash[v] = 1))
  Object.values(hash).forEach(v => sum += Math.floor(v / 2))

  return sum
}

// Drawing Book
// They can start at the beginning or the end of the book.
// Given n (number of pages of the book) and p (page), find and print the minimum number of pages that must be turned in order to arrive at p.
function pageCount(n, p) {
  const front = Math.floor(p / 2),
    back = Math.floor(n / 2) - Math.floor(p / 2)

  return front < back ? front : back
}

const r = sockMerchant

