function renameFile(newName, oldName) {
  let o = 0, n = 0, count = 0, prevO = 0, lastNonO = oldName.length, aux = {}

  while (true) {
    if (n == 0 && o == oldName.length) break

    if (n == newName.length) {
      count++
      n--
      // lastNonO=o
    }

    if (o == oldName.length) {
      n--
      o = aux[n] + 1
    }

    if (newName[n] == oldName[o]) {
      aux[n] = o
      n++
      o++
    } else o++

  }

  return count
}

function renameFile(newName, oldName) {
  const hash = {}, i = []

  for (let i = 0; i < oldName.length; i++) {
    let c = oldName[i]
    if (!hash[c]) hash[c] = [i]
    else hash[c].push(i)
  }

  for (let n = 0; n < newName.length; n++) {
    let c = newName[n]
    i[n] = hash[c].find(v => v >= n)
  }

  return hash
}

// 2*2*(2+1)

// Uma letra => combinação de old.len, new.len

// console.log(renameFile('zabca', 'zzaabcbca'))
// console.log(renameFile('abc', 'abcbc'))

// console.log(renameFile('ab', 'aaabb'))
// // 3*2

// console.log(renameFile('ab', 'abab'))
// // 1+1

// console.log(renameFile('ab', 'aabab'))
// // 2*(1+1)

function recursive(nn, on) {
  if (!nn || !on) return 0
  if (nn.length == 1) return on.split('').filter(v => v == nn).length

  let firstPreviousLetter = -1
  for (let n = 0; n < nn.length; n++) {
    let count = 0
    for (let o = firstPreviousLetter + 1; o <= on.length - nn.length + n; o++) {
      if (on[o] == nn[n]) {
        if (firstPreviousLetter < 0) firstPreviousLetter = o
        count++
      }
      if (on[o] == nn[n + 1] && firstPreviousLetter != -1) {
        return count * recursive(nn.slice(n + 1), on.slice(o)) + recursive(nn, on.slice(o))
      }
    }
  }
  return on.match(nn) ? 1 : 0
}

console.log(recursive('ab', 'cdebbaaabbaabcdeaaaacd'))
console.log(recursive('aba', 'ababa'))
// 3*2