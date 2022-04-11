// The Bomberman Game
function bomberMan(n, grid) {
  if (n == 1) return grid
  if (n % 2 == 0) return grid.map(r => r.replace(/\./g, 'O'))

  let matrix = grid.map(r => r.split(''))

  const explodeBomb = (m, i, j) => {
    m[i][j] = '.'
    m[i][Math.min(j + 1, m[0].length - 1)] = '.'
    m[i][Math.max(0, j - 1)] = '.'
    m[Math.min(i + 1, m.length - 1)][j] = '.'
    m[Math.max(0, i - 1)][j] = '.'
  }

  const nextGrid = matrix => {
    const m = grid.map(r => r.replace(/\./g, 'O').split(''))

    for (let i = 0; i < m.length; i++)
      for (let j = 0; j < m[0].length; j++)
        if (matrix[i][j] == 'O') explodeBomb(m, i, j)

    return m
  }

  // That's the version without the optimization
  // for (let t = 3; t <= n; t += 2) {
  //   matrix = nextGrid(matrix)
  // }
  // return matrix.map(r => r.join(''))

  // The catch to optimize the algorithm is that it starts a cycle after the first fill all gaps with bombs
  return ((n - 1) / 2) % 2 ? nextGrid(matrix).map(r => r.join('')) : nextGrid(nextGrid(matrix)).map(r => r.join(''))

}

//New Year Chaos
// Each person wears a sticker indicating their initial position in the queue from 1 to n. 
// Any person can bribe the person directly in front of them to swap positions, but they still wear their original sticker. 
// One person can bribe at most two others.
// Determine the minimum number of bribes that took place to get to a given queue order. 
// Print the number of bribes, or, if anyone has bribed more than two people, print Too chaotic.
function minimumBribes(q) {
  for (let i = 0; i < q.length; i++) {
    if (q[i] - i - 1 > 2) {
      console.log('Too chaotic')
      return
    }
  }

  let bribes = 0, i = 0
  while (i < q.length - 1) {
    if (q[i] != i + 1) {
      let j = i
      while (j < q.length - 1) {
        if (q[j] > q[j + 1]) {
          const aux = q[j]
          q[j] = q[j + 1]
          q[j + 1] = aux
          bribes++
        } j++
      }
    } else i++
  }

  console.log(bribes)
}


// Sherlock and the Valid String
// Sherlock considers a string to be valid if all characters of the string appear the same number of times. 
// It is also valid if he can remove just 1 character at 1 index in the string, and the remaining characters will occur the same number of times. 
// Given a string , determine if it is valid. If so, return YES, otherwise return NO.
function isValid(s) {
  const hash = {}
  for (let c of s) hash[c] = ++hash[c] || 1

  const count = {}
  for (let v of Object.values(hash)) count[v] = ++count[v] || 1

  const keys = Object.keys(count)

  if (keys.length > 2) return 'NO'
  if (keys.length == 2) {
    if (count['1'] == 1 || (keys[1] - keys[0] == 1 && count[keys[1]] == 1)) return 'YES'
    return 'NO'
  }
  return 'YES'
}

// Climbing the Leaderboard
// An arcade game player wants to climb to the top of the leaderboard and track their ranking. 
// The game uses Dense Ranking, so its leaderboard works like this:
// The player with the highest score is ranked number  on the leaderboard.
// Players who have equal scores receive the same ranking number, and the next player(s) receive the immediately following ranking number.

// 6/10
function climbingLeaderboard6(ranked, player) {
  const rank = [ranked[0]], scores = []
  for (let r of ranked) if (rank[rank.length - 1] != r) rank.push(r)
  rank.push(0)

  for (let p of player) {
    for (let i = 0; i < rank.length; i++) {
      if (p == rank[i]) {
        scores.push(i + 1)
        break
      } else if (p > rank[i]) {
        scores.push(i + 1)
        rank.splice(i, 0, p)
        break
      }
    }
  }

  return scores
}

// 8/10 For this solution I implemented Binary search, and removed the 0 to use push instead of splice to add the least score
function climbingLeaderboard8(ranked, player) {
  const rank = [ranked[0]], scores = []
  for (let r of ranked) if (rank[rank.length - 1] != r) rank.push(r)

  const binarySearch = (arr, v, ini, end) => {
    if (arr[ini] < v) return ini
    if (arr[end] > v) return end + 1
    if (ini == end) return ini

    const m = Math.floor((end - ini) / 2) + ini
    if (arr[m] == v) return m

    if (v < arr[m]) return binarySearch(arr, v, m + 1, end)
    else return binarySearch(arr, v, ini, m - 1)
  }

  for (let p of player) {
    const pos = binarySearch(rank, p, 0, rank.length - 1)
    if (pos == rank.length) {
      rank.push(p)
      scores.push(rank.length)
    } else {
      if (p > rank[pos]) rank.splice(pos, 0, p)
      scores.push(pos + 1)
    }

  }

  return scores
}

// 9/10 Get the last value to improve the binary search
function climbingLeaderboard9(ranked, player) {
  const rank = [ranked[0]], scores = []
  for (let r of ranked) if (rank[rank.length - 1] != r) rank.push(r)

  const binarySearch = (arr, v, ini, end) => {
    while (true) {
      if (arr[ini] < v) return ini
      if (arr[end] > v) return end + 1
      if (ini == end) return ini

      const m = Math.floor((end - ini) / 2) + ini
      if (arr[m] == v) return m

      if (v < arr[m]) ini = m + 1
      else end = m - 1
    }
  }

  let ini = 0, end = rank.length - 1
  for (let i = 0; i < player.length; i++) {
    const p = player[i]
    const pos = binarySearch(rank, p, ini, end)
    if (pos == rank.length) {
      rank.push(p)
      scores.push(rank.length)
    } else {
      if (p > rank[pos]) rank.splice(pos, 0, p)
      scores.push(pos + 1)
    }

    if (player[Math.min(i + 1, player.length)] < p) ini = scores[scores.length - 1]
    else end = scores[scores.length - 1]

  }

  return scores
}

// Here I realized the all new scores are increasing, as implied by the title of the problem, but not clear in the discription
// In this case you don't need to keep track of the rank, since the position will be the same or higher than the last one
function climbingLeaderboard10(ranked, player) {
  const rank = [...new Set(ranked)], scores = []

  let i = rank.length
  for (let p of player) {
    while (i > 0) {
      if (p > rank[i - 1]) {
        i--
        continue
      }
      scores.push(i + (p < rank[i - 1]))
      break
    }

    if (!i) scores.push(1)
  }

  return scores
}

// Reverse a linked list
// Given the pointer to the head node of a linked list, change the next pointers of the nodes so that their order is reversed. 
// The head pointer given may be null meaning that the initial list is empty.
function reverse(llist) {
  let prev = null, next

  while (llist != null) {
    next = llist.next
    llist.next = prev
    prev = llist
    llist = next
  }

  return prev
}

// Reverse a doubly linked list
// Given the pointer to the head node of a doubly linked list, reverse the order of the nodes in place. 
// That is, change the next and prev pointers of the nodes so that the direction of the list is reversed. 
// Return a reference to the head node of the reversed list.
function reverseD(llist) {
  let aux
  while (llist != null) {
    aux = llist.next
    llist.next = llist.prev
    llist.prev = aux

    aux = llist
    llist = llist.prev
  }

  return aux
}

// Insert a node at a specific position in a linked list
// Given the pointer to the head node of a linked list and an integer to insert at a certain position, 
// create a new node with the given integer as its  attribute, insert this node at the desired position and return the head node.
function insertNodeAtPosition(llist, data, position) {
  const node = new SinglyLinkedListNode(data)

  if (!llist || !position) {
    node.next = llist
    return node
  }

  const head = llist
  for (let i = 0; i < position - 1; i++) {
    llist = llist.next
  }

  node.next = llist.next
  llist.next = node

  return head
}

// Merge two sorted linked lists
// Given pointers to the heads of two sorted linked lists, merge them into a single, sorted linked list. 
// Either head pointer may be null meaning that the corresponding list is empty.
function mergeLists(head1, head2) {
  if (!head1) return head2
  if (!head2) return head1

  let head
  if (head1.data < head2.data) {
    head = head1
    head1 = head1.next
  } else {
    head = head2
    head2 = head2.next
  }

  let node = head
  while (true) {
    if (!head1) {
      node.next = head2
      break
    }
    if (!head2) {
      node.next = head1
      break
    }
    if (head1.data < head2.data) {
      node.next = head1
      head1 = head1.next
    } else {
      node.next = head2
      head2 = head2.next
    }

    node = node.next
  }

  return head
}

// Ice Cream Parlor
// Two friends like to pool their money and go to the ice cream parlor. 
// They always choose two distinct flavors and they spend all of their money.
// Given a list of prices for the flavors of ice cream, select the two that will cost all of the money they have.
function icecreamParlor(m, arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == m) return [i + 1, j + 1]
    }
  }
}

// Queue using Two Stacks
// In this challenge, you must first implement a queue using two stacks. 
// Then process  queries, where each query is one of the following  types

// Even avoiding unecessary flips, it only gets 8/10 due to time out
function processData(input) {
  input = input.split('\n').slice(1)

  const pushQ = [], popQ = []
  const flip = () => {
    if (!popQ.length)
      while (pushQ.length) popQ.push(pushQ.pop())
    else while (popQ.length) pushQ.push(popQ.pop())
  }

  for (let q of input) {
    switch (q) {
      case '2':
        if (!popQ.length) flip()
        popQ.pop()
        break
      case '3':
        if (popQ.length) console.log(popQ[popQ.length - 1])
        else console.log(pushQ[0])
        break
      default:
        if (popQ.length) flip()
        pushQ.push(q.slice(2))
    }
  }
}

// This implementation uses one stack and a pointer to avoid shift
function processData(input) {
  input = input.split('\n').slice(1)

  const queue = []
  let first = 0

  for (let q of input) {
    switch (q) {
      case '2':
        first++
        break
      case '3':
        console.log(queue[first])
        break
      default:
        queue.push(q.slice(2))
    }
  }
}

// Balanced Brackets
// Return YES if all brackets in a sequence are matched
function isBalanced(s) {
  while (true) {
    let r = ''
    for (let i = 0; i < s.length; i++) {
      const diff = s.charCodeAt(i) - s.charCodeAt(i + 1)
      if (diff == -1 || diff == -2) i++
      else r += s[i]
    }

    if (r == s) break
    s = r
  }

  return s.length ? "NO" : "YES"
}

// Waiter
// You are a waiter at a party. There is a pile of numbered plates. Create an empty answers array. 
// At each iteration, i, remove each plate from the top of the stack in order. 
// Determine if the number on the plate is evenly divisible by the ith prime number. 
// If it is, stack it in pile Bi. Otherwise, stack it in stack Ai. 
// Store the values in Bi from top to bottom in answers. 
// In the next iteration, do the same with the values in stack Ai. 
// Once the required number of iterations is complete, store the remaining values in Ai in answers, again from top to bottom. Return the answers array.
function primeFactorsTo(max) {
  const store = [], primes = [];
  for (let i = 2; i <= max; ++i) {
    if (!store[i]) {
      primes.push(i);
      for (let j = i << 1; j <= max; j += i) {
        store[j] = true;
      }
    }
  }
  return primes;
}

function waiter(number, q) {
  const answers = [],
    p = primeFactorsTo(11 * q),
    a = [], b = []

  for (let i = 0; i < q; i++) {
    while (number.length) {
      const n = number.pop()
      if (n % p[i] == 0) {
        if (b[i]) b[i].push(n)
        else b[i] = [n]
      } else {
        if (a[i]) a[i].push(n)
        else a[i] = [n]
      }
    }
    if (b[i]) while (b[i].length) answers.push(b[i].pop())
    number = a[i]
  }
  if (a[q - 1]) while (a[q - 1].length) answers.push(a[q - 1].pop())

  return answers
}

// Simple Text Editor
// append(w), delete(k), print(k), undo()
function processData(input) {
  input = input.split('\n').slice(1)
  let s = ''
  const history = []

  for (let op of input) {
    switch (op[0]) {
      case '1':
        history.push(s)
        s += op.slice(2)
        break
      case '2':
        history.push(s)
        s = s.slice(0, -op.slice(2))
        break
      case '3':
        console.log(s[+op.slice(2) - 1])
        break
      case '4':
        s = history.pop()
    }
  }
}