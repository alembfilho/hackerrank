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

// Tower Breakers
// Two players are playing a game of Tower Breakers! Player  always moves first, and both players always play optimally.
// The rules of the game are as follows:
//    Initially there are n towers.
//    Each tower is of height m.
//    The players move in alternating turns.
//    In each turn, a player can choose a tower of height x and reduce its height to y, where 1<=y<x and y evenly divides x.
//    If the current player is unable to make a move, they lose the game.
// Given the values of  and , determine which player will win. If the first player wins, return . Otherwise, return .
function towerBreakers(n, m) {
  if (m == 1) return 2
  return n % 2 ? 1 : 2
}

// Caesar Cipher
// Julius Caesar protected his confidential information by encrypting it using a cipher. 
// Caesar's cipher shifts each letter by a number of letters. 
// If the shift takes you past the end of the alphabet, just rotate back to the front of the alphabet. 
// In the case of a rotation by 3, w, x, y and z would map to z, a, b and c.
function caesarCipher(s, k) {
  let res = ""
  for (let c of s) {
    if (c >= 'a' && c <= 'z') {
      res += String.fromCharCode(
        'a'.charCodeAt(0) + (c.charCodeAt(0) - 'a'.charCodeAt(0) + k) % 26)
    } else if (c >= 'A' && c <= 'Z') {
      res += String.fromCharCode(
        'A'.charCodeAt(0) + (c.charCodeAt(0) - 'A'.charCodeAt(0) + k) % 26)
    } else res += c
  }

  return res
}

// Max Min
// You will be given a list of integers, arr, and a single integer k. 
// You must create an array of length k from elements of arr such that its unfairness is minimized. Call that array arr'. 
// Unfairness of an array is calculated as max(arr') - min(arr')
function maxMin(k, arr) {
  arr.sort((a, b) => a - b)
  let min = arr[arr.length - 1] - arr[0]

  for (let i = 0; i < arr.length - k + 1; i++) {
    let unf = arr[i + k - 1] - arr[i]
    min = unf < min ? unf : min
  }

  return min
}

// Dynamic Array
// Just need to follow the instructions
function dynamicArray(n, queries) {
  const arr = [...Array(n)].map(a => []),
    ans = []
  let lastAnswer = 0
  const id = x => (x ^ lastAnswer) % n

  for (let [q, x, y] of queries) {
    if (q == 1) {
      arr[id(x)].push(y)
    } else {
      lastAnswer = arr[id(x)][y % arr[id(x)].length]
      ans.push(lastAnswer)
    }
  }

  return ans
}

// Grid Challenge
// Given a square grid of characters in the range ascii[a-z], rearrange elements of each row alphabetically, ascending. 
// Determine if the columns are also in ascending alphabetical order, top to bottom. Return YES if they are or NO if they are not.
function gridChallenge(grid) {
  const m = grid.map(row => row.split('').sort())
  for (let j in m) {
    for (let i = 0; i < m.length - 1; i++) {
      if (m[i][j] > m[i + 1][j]) return "NO"
    }
  }
  return "YES"
}

// Sherlock and Array
// Watson gives Sherlock an array of integers. 
// His challenge is to find an element of the array such that the sum of all elements to the left is equal to the sum of all elements to the right.
function balancedSums(arr) {
  let i = 0,
    l = 0,
    r = arr.slice(1).reduce((t, v) => t + v, 0)

  while (true) {
    if (l == r) return "YES"
    if (l > r) break

    l += arr[i++]
    r -= arr[i]
  }
  return "NO"
}

// Recursive Digit Sum
// We define super digit of an integer  using the following rules:
//  Given an integer, we need to find the super digit of the integer.
//  If x has only 1 digit, then its super digit is x.
// Otherwise, the super digit of  is equal to the super digit of the sum of the digits of x.
function superDigit(n, k) {
  const sum = n.split('').reduce((t, v) => t + parseInt(v), 0) * k

  if (sum < 10) return sum
  else return superDigit(sum.toString(), 1)
}

// Counter game
// Louise and Richard have developed a numbers game. 
// They pick a number and check to see if it is a power of 2. If it is, they divide it by 2. 
// If not, they reduce it by the next lower number which is a power of 2. 
// Whoever reduces the number to 1 wins the game. Louise always starts.
function counterGame(n) {
  let turn = 1,
    bin = n.toString(2)           //Convert to binary

  while (true) {
    if (bin.length == 1) break

    if (!parseInt(bin.slice(1)))  //Test if power of 2
      bin = bin.slice(0, -1)      //Divide by 2
    else bin = parseInt(bin.slice(1), 2).toString(2)       //Subtract lower power of 2

    turn++
  }

  return turn % 2 ? 'Richard' : 'Louise'
}

// Sum vs XOR
// Basic implementation, times out on big numbers
function sumXor(n) {
  let sum = 0
  if (n > 0 && !parseInt(n.toString(2).slice(1))) return n

  for (let x = 0; x <= n; x++) {
    if (n + x == (n ^ x)) sum++
  }
  return sum
}

// After printing 100 values using sumXor, I saw a pattern and replicated using gen
// Still cannot be fast enough
// 1, 1, 
// 2, 1, 
// 4, 2, 2, 1, 
// 8, 4, 4, 2, 4, 2, 2, 1, 
// 16, 8, 8, 4, 8, 4, 4, 2, 8, 4, 4, 2, 4, 2, 2, 1, 
// 32, 16, 16, 8, 16, 8, 8, 4, 16, 8, 8, 4, 8, 4, 4, 2, 16, 8, 8, 4, 8, 4, 4, 2, 8, 4, 4, 2, 4, 2, 2, 1, 
// 64, 32, 32, 16, 32, 16, 16, 8, 32, 16, 16, 8, 16, 8, 8, 4, 32, 16, 16, 8, 16, 8, 8, 4, 16, 8, 8, 4, 8, 4, 4, 2, 32, 16, 16, 8
function gen(n) {
  let res = { 2: [2, 1] }
  let i = 2

  if (n < 2) return 1

  while (i * 2 <= n) {
    res[i * 2] = [...res[i].map(v => v * 2), ...res[i]]
    i *= 2
  }

  return res[i][n - i]
}

// Calculates the least amount possible
function ultra(n) {
  if (n < 2) return 1
  if (!parseInt(n.toString(2).slice(1))) return n

  let bin = 2 ** (n.toString(2).length - 1), // Using gen() as reference, this is the row (or key)
    res = n // This is the column (or index)

  // Find the same pattern on previous row by subtracting the row from the column
  while (true) {
    if (res - bin < 1) {
      bin *= 2
      break
    }
    res -= bin
    bin /= 2
  }

  // The pattern repeats on the row obbeying 1 1 2 4 8...
  while (true) {
    let rep = 1
    if (bin > 2 && res > 2) {
      bin /= 2
      res -= 1
      while (true) {
        if (res - rep < 0) break
        if (res - rep == 0) {
          res = 0
          break
        }
        res -= rep
        rep *= 2
      }
    } else break
  }

  // Builds the pattern up the one needed
  const arr = [bin]
  while (true) {
    for (let j in arr) {
      arr.push(arr[j] / 2)
      if (arr.length >= res + 1) return arr[res]
    }
  }
}