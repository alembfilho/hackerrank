// Plus Minus
// Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero. 
// Print the decimal value of each fraction on a new line with  places after the decimal.
function plusMinus(arr) {
  let pos = 0,
    neg = 0,
    zero = 0

  arr.forEach(v => {
    if (v == 0) zero++
    else if (v < 0) neg++
    else pos++
  })

  console.log((pos / arr.length).toFixed(6))
  console.log((neg / arr.length).toFixed(6))
  console.log((zero / arr.length).toFixed(6))
}

// Mini-Max Sum
// Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. 
// Then print the respective minimum and maximum values as a single line of two space-separated long integers.
function miniMaxSum(arr) {
  arr.sort((a, b) => a - b)
  console.log(
    arr.slice(0, 4).reduce((t, v) => t + v, 0),
    arr.slice(-4).reduce((t, v) => t + v, 0)
  )
}

// Time Conversion
// Given a time in -hour AM/PM format, convert it to military (24-hour) time.
// Note:  12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
//        12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.
function timeConversion(s) {
  const ampm = s.slice(-2)
  let [h, m, sec] = s.slice(0, -2).split(":")

  if (h == "12") {
    h = ampm == "AM" ? "00" : h
  } else if (ampm == "PM") {
    h = parseInt(h) + 12
  }

  return [h, m, sec].join(":")
}

// Sparse Arrays
// There is a collection of input strings and a collection of query strings. 
// For each query string, determine how many times it occurs in the list of input strings. Return an array of the results.
function matchingStrings(strings, queries) {
  const obj = {}

  strings.forEach(v => {
    obj[v] = obj[v] ? ++obj[v] : 1
  })

  return queries.map(v => obj[v] || 0)
}


// Lonely Integer
// Given an array of integers, where all elements but one occur twice, find the unique element.
function lonelyinteger(a) {
  a.sort((b, c) => b - c)

  for (let i = 0; i < a.length - 1; i += 2) {
    if (a[i] != a[i + 1]) return a[i]
  }

  return a[a.length - 1]
}

// Flipping bits
// You will be given a list of 32 bit unsigned integers. Flip all the bits and return the result as an unsigned integer.
function flippingBits(n) {
  let bin = n
    .toString(2)
    .split("")
    .map(v => (parseInt(v) + 1) % 2)
    .join("")

  return parseInt(new Array(32 - bin.length).fill(1).join("") + bin, 2)
}

// Diagonal Difference
// Given a square matrix, calculate the absolute difference between the sums of its diagonals.
function diagonalDifference(arr) {
  let lr = 0,
    rl = 0

  for (let i = 0; i < arr.length; i++) {
    lr += arr[i][i]
    rl += arr[i][arr.length - 1 - i]
  }

  return Math.abs(lr - rl)
}

// Counting Sort 1
// Another sorting method, the counting sort, does not require comparison. 
// Instead, you create an integer array whose index range covers the entire range of values in your array to sort. 
// Each time a value occurs in the original array, you increment the counter at that index. 
// At the end, run through your counting array, printing the value of each non-zero valued index that number of times.
function countingSort(arr) {
  const freq = new Array(100).fill(0)
  arr.forEach(v => freq[v]++)

  return freq
}

// Pangrams
// A pangram is a string that contains every letter of the alphabet. 
// Given a sentence determine whether it is a pangram in the English alphabet. 
// Ignore case. Return either pangram or not pangram as appropriate.
function pangrams(s) {
  let alfa = {},
    count = 0
  new Array(26)
    .fill("a".charCodeAt(0))
    .forEach((v, i) => alfa[String.fromCharCode(v + i)] = 0)

  for (let c of s) {
    if (c == " ") continue
    if (!alfa[c.toLowerCase()]) {
      alfa[c.toLowerCase()]++
      count++
    }
    if (count == 26) return "pangram"
  }

  return "not pangram"
}

// Permuting Two Arrays
// There are two -element arrays of integers, A and B. 
// Permute them into some A' and B' such that the relation A'[i]+B'[i]>=k.
// For each query, return YES if some permutation satisfying the relation exists. Otherwise, return NO.
function twoArrays(k, A, B) {
  A.sort((a, b) => a - b)
  B.sort((a, b) => b - a)

  for (let i in A)
    if (A[i] + B[i] < k) return "NO"

  return "YES"
}

// Subarray Division 1
// Lily decides to share a contiguous segment of the bar selected such that:
//  The length of the segment matches Ron's birth month, and,
//  The sum of the integers on the squares is equal to his birth day.
// Determine how many ways she can divide the chocolate.
function birthday(s, d, m) {
  let count = 0
  for (let i = 0; i <= s.length - m; i++) {
    if (s.slice(i, i + m).reduce((t, v) => t + v, 0) == d) count++
  }

  return count
}