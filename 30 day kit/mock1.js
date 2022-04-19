// Find the median of an odd length array
function findMedian(arr) {
  arr.sort((a, b) => a - b)
  return arr[(arr.length - 1) / 2]
}

// Get the maximum sum of the first quadrant you can get after reversing any row or column as many times as needed
function flippingMatrix(matrix) {
  let sum = 0
  const l = matrix.length - 1

  for (let i = 0; i < matrix.length / 2; i++) {
    for (let j = 0; j < matrix.length / 2; j++) {
      // Get the maximum among the mirrored values on the 4 quadrants
      sum += [
        matrix[i][j],
        matrix[l - i][j],
        matrix[i][l - j],
        matrix[l - i][l - j]
      ].reduce((m, v) => v > m ? v : m, 0)
    }
  }

  return sum
}