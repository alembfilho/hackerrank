// 2D Array - DS
function hourglassSum(arr) {
  const sum = []
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let hg = 0
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          hg += arr[k][l]
        }
      }
      hg -= arr[i + 1][j] + arr[i + 1][j + 2]
      sum.push(hg)
    }
  }
  return Math.max(...sum)
}

// Arrays: Left Rotation
function rotLeft(a, d) {
  return [...a.slice(d), ...a.slice(0, d)]
}

// Minimum Swaps 2
function minimumSwaps(arr) {
  let i = 0, count = 0
  while (i < arr.length) {
    if (arr[i] == i + 1) i++
    else {
      const aux = arr[i]
      arr[i] = arr[arr[i] - 1]
      arr[aux - 1] = aux
    }
  }
  return count
}

