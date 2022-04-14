// Hash Tables: Ransom Note
function checkMagazine(magazine, note) {
  const hash = {}

  magazine.forEach(w => hash[w] = ++hash[w] || 1)
  for (let w of note) {
    if (!hash[w]) return console.log('No')
    hash[w]--
  }

  return console.log('Yes')
}

// Two Strings
function twoStrings(s1, s2) {
  for (let c of s2)
    if (s1.match(c)) return 'YES'
  return 'NO'
}

// Sherlock and Anagrams
function sherlockAndAnagrams(s) {
  const hash = [...Array(s.length)].map(v => ({}))
  let count = 0

  for (let size = 1; size < s.length; size++) {
    for (let i = 0; i <= s.length - size; i++) {
      hash[i][s[i + size - 1]] = ++hash[i][s[i + size - 1]] || 1
    }

    const k = hash.map(o => Object.keys(o))
    const ks = k.map(o => o.sort().join(''))
    for (let i = 0; i < s.length - size; i++) {
      for (let j = i + 1; j <= s.length - size; j++) {
        if (ks[i] == ks[j]) {
          let isEqual = true
          for (let key of k[i]) {
            if (hash[i][key] != hash[j][key]) {
              isEqual = false
              break
            }
          }
          if (isEqual) count++
        }
      }
    }
  }

  return count
}

// Count Triplets
function countTriplets(arr, r) {
  const freq = {}, pair = {}

  let count = 0
  for (let i = arr.length - 1; i >= 0; i--) {
    const v = arr[i]

    if (pair[v * r]) count += pair[v * r]
    if (freq[v * r]) pair[v] = (pair[v] || 0) + freq[v * r]

    freq[v] = ++freq[v] || 1
  }

  return count
}

// Frequency Queries
function freqQuery(queries) {
  const hash = {}, freq = [], ans = []
  for (let [q, v] of queries) {
    switch (q) {
      case 1:
        hash[v] = ++hash[v] || 1

        freq[hash[v]] = ++freq[hash[v]] || 1
        freq[hash[v] - 1] = --freq[hash[v] - 1]
        break
      case 2:
        if (hash[v]) {
          hash[v] = --hash[v] || 0

          freq[hash[v]]++
          freq[hash[v] + 1]--
        }
        break
      case 3:
        ans.push(freq[v] > 0 ? 1 : 0)
    }
  }
  return ans
}