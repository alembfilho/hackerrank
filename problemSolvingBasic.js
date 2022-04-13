
// Unexpected Demand
// The maximum number of orders that can be fulfiled with k products
function filledOrders(order, k) {
  order.sort((a, b) => a - b)
  let sum = 0
  for (let i in order) {
    sum += order[i]
    if (sum > k) return i
  }
  return order.length
}


// Nearly Similar Rectangles
// Return number of Nearly Similar Rectangles (a/c = b/d) on a list 

// Naive
function nearlySimilarRectangles(sides) {
  let sum = 0
  for (let i = 0; i < sides.length - 1; i++)
    for (let j = i + 1; j < sides.length; j++)
      if (sides[i][0] / sides[j][0] == sides[i][1] / sides[j][1]) sum++

  return sum
}

// Fast using frequency and combination
function nearlySimilarRectangles(sides) {
  const hash = {}
  sides.forEach(([a, b]) => hash[b / a] = ++hash[b / a] || 1)
  return Object.values(hash).reduce((t, v) => t + v * (v - 1) / 2, 0)
}