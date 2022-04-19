// Truck Tour
function truckTour(petrolpumps) {
  for (let i = 0; i < petrolpumps.length; i++) {
    let tank = 0
    for (let j = i; j < petrolpumps.length + i; j++) {
      let gs = j % petrolpumps.length
      tank += petrolpumps[gs][0] - petrolpumps[gs][1]
      if (tank < 0) break
    }
    if (tank >= 0) return i
  }
}

// Pairs
function pairs(k, arr) {
  arr.sort((a, b) => a - b)
  let count = 0
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] - arr[i] == k) {
        count++
        break
      }
      if (arr[j] - arr[i] > k) break
    }
  }
  return count
}

// Sort arrays of numbers in string form of up to 10^6 characters
// This solution got only 9/10, it keeps timing out. Tried QuickSort, MergerSort and InsertionSort with no improvements
function bigSorting(unsorted) {
  return unsorted.sort((a, b) => {
    if (a.length != b.length) return a.length - b.length
    for (let i in a) if (a[i] != b[i]) return a[i] - b[i]
  })
}