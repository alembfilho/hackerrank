// Palindrome index
// Check if removing one letter you get a palindrome
function palindromeIndex(s) {
  const isPalindrome = s => {
    for (let i = 0; i < s.length; i++) {
      if (s[i] != s[s.length - 1 - i]) return false
    }
    return true
  }

  if (isPalindrome(s)) return -1

  let i = 0, j = s.length - 1
  while (i <= j) {
    if (s[i] == s[j]) {
      i++
      j--
    } else {
      if (isPalindrome(s.slice(i, j))) return j
      if (isPalindrome(s.slice(i + 1, Math.min(j + 1, s.length - 1)))) return i
    }
  }

  return -1
}

// Numbers in between
// Return the amount of numbers that are multiples of all a, end divisors of all b
function getTotalX(a, b) {
  let count = 0
  for (let i = a[a.length - 1]; i <= b[0]; i++) {
    if (a.every(va => i % va == 0) && b.every(vb => vb % i == 0)) count++
  }

  return count
}

// Anagram
// How many leters to change on first half to get an anagram os the second
function anagram(s) {
  if (s.length % 2 != 0) return -1
  const hash = {}
  for (let i = 0; i < s.length; i++) {
    if (i < s.length / 2) hash[s[i]] = ++hash[s[i]] || 1
    else if (hash[s[i]]) hash[s[i]]--
  }
  return Object.values(hash).reduce((t, v) => t + v, 0)
}