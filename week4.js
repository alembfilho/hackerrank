// Equal Stacks
// You have three stacks of cylinders where each cylinder has the same diameter, but they may vary in height. 
// You can change the height of a stack by removing and discarding its topmost cylinder any number of times.
// Find the maximum possible height of the stacks such that all of the stacks are exactly the same height. 
// This means you must remove zero or more cylinders from the top of zero or more of the three stacks until they are all the same height, then return the height.
function equalStacks(h1, h2, h3) {
  const s = {
    1: { h: h1.reverse(), height: h1.reduce((t, v) => t + v, 0) },
    2: { h: h2.reverse(), height: h2.reduce((t, v) => t + v, 0) },
    3: { h: h3.reverse(), height: h3.reduce((t, v) => t + v, 0) }
  }

  while (!(s[1].height == s[2].height && s[1].height == s[3].height)) {
    let max = (s[1].height > s[2].height && s[1].height > s[3].height) ?
      s[1] : (s[2].height > s[3].height) ? s[2] : s[3]
    max.height -= max.h.pop()
  }

  return s[1].height
}

// The Maximum Subarray
// We define subsequence as any subset of an array. We define a subarray as a contiguous subsequence in an array.
// Given an array, find the maximum possible sum among:
// all nonempty subarrays.
// all nonempty subsequences.
// Print the two values as space-separated integers on one line.

// 9/10 due to timeout. This solution testes all possible subarray sizes, and translates them 1 by 1 until gets the best
function maxSubarray(arr) {
  let max = -Infinity, sum = 0, startSum = 0

  for (let size = 1; size <= arr.length; size++) {
    startSum += arr[size - 1]
    sum = startSum
    if (max < sum) max = sum

    for (let i = 0; i < arr.length - size; i++) {
      sum += arr[i + size] - arr[i]
      if (max < sum) max = sum
    }
  }

  return [max, arr.reduce((t, v) => Math.max(v + t, t, v), -Infinity)]
}

// arr[i]= means sub size keeps growing until the sum gets negative, then it restarts from the next
// aux keeps the best option found so far
function maxSubarray(arr) {
  const subS = arr.reduce((t, v) => Math.max(v + t, t, v), -Infinity),
    aux = arr.map(v => -Infinity)
  aux[0] = arr[0]

  for (let i = 1; i < arr.length; i++) {
    aux[i] = Math.max(aux[i - 1], arr[i - 1] + arr[i], arr[i]);
    arr[i] = Math.max(arr[i - 1] + arr[i], arr[i]);
  }

  return [aux[arr.length - 1], subS];
}

function maxSubarray(arr) {
  const subS = arr.reduce((t, v) => Math.max(v + t, t, v), -Infinity),
    aux = arr.map(v => -Infinity)
  aux[0] = arr[0]

  for (let i = 1; i < arr.length; i++) {
    aux[i] = Math.max(aux[i - 1], arr[i - 1] + arr[i], arr[i]);
    arr[i] = Math.max(arr[i - 1] + arr[i], arr[i]);
  }

  return [aux[arr.length - 1], subS];
}

// Jesse and Cookies
// Jesse loves cookies and wants the sweetness of some cookies to be greater than value k. 
// To do this, two cookies with the least sweetness are repeatedly mixed. This creates a special combined cookie with:
// sweetness =(1* Least sweet cookie +2*  2nd least sweet cookie).
// This occurs until all the cookies have a sweetness >=k.
// Given the sweetness of a number of cookies, determine the minimum number of operations required. 
// If it is not possible, return -1.
function cookies(k, A) {
  const B = [] // The trick is to use a second stack to avoid sorting, and get all tests in time
  A.sort((a, b) => a - b)

  let count = 0, i = 0, j = 0
  while (i < A.length || j < B.length) {
    let c1 = A[i] < (B[j] || Infinity) ? A[i++] : B[j++],
      c2 = A[i] < (B[j] || Infinity) ? A[i++] : B[j++]

    if (c1 >= k) return count

    B.push(c1 + 2 * c2)
    count++
  }

  return -1
}

// Hackerland Radio Transmitters
// Hackerland is a one-dimensional city with houses aligned at integral locations along a road. 
// The Mayor wants to install radio transmitters on the roofs of the city's houses. 
// Each transmitter has a fixed range meaning it can transmit a signal to all houses within that number of units distance away.
// Given a map of Hackerland and the transmission range, determine the minimum number of transmitters so that every house is within range of at least one transmitter. 
// Each transmitter must be installed on top of an existing house.
function hackerlandRadioTransmitters(x, k) {
  x.sort((a, b) => a - b)

  let i = 0, j = 1, count = 0
  while (i < x.length) {
    if (x[j] - x[i] <= k) j++
    else {
      count++
      i = j - 1
      while (x[j] - x[i] <= k) j++
      i = j++
    }
  }

  return count
}

// Queries with Fixed Length
// The catch is that you don't need to recalculate max while shifting, unless the max value is the first
function solve(arr, queries) {
  return queries.map(q => {
    const max = []
    let isMaxAtBeginning = true

    for (let i = 0; i <= arr.length - q; i++) {
      max[i] = isMaxAtBeginning ?
        Math.max(...arr.slice(i, i + q)) :
        Math.max(max[i], arr[i + q - 1])

      max.push(max[i])
      isMaxAtBeginning = max[i] === arr[i]
    }

    return Math.min(...max)
  })
}

// Array Manipulation
// Starting with a 1-indexed array of zeros and a list of operations, 
// for each operation add a value to each the array element between two given indices, inclusive. 
// Once all operations have been performed, return the maximum value in the array.
function arrayManipulation(n, queries) {
  const arr = new Array(n + 1).fill(0)

  queries.forEach(([a, b, k]) => {
    for (let i = a; i <= b; i++)arr[i] += k
  })

  return Math.max(...arr)
}

// The catch is to add only to a, and remove from b+1
// This means "Starting here we add k" and "from now on, we don't, so let's cancel"
// At the end we sum from the begining and return the biggest partial
function arrayManipulation(n, queries) {
  const arr = Array(n + 1).fill(0)
  for (let [a, b, k] of queries) arr[a - 1] += k, arr[b] -= k
  return arr.reduce(([total, max], c) => [total + c, Math.max(max, total + c)], [0, 0])[1]
}

console.log(arrayManipulation(10, [[1, 5, 3], [4, 8, 7], [6, 9, 1]]))