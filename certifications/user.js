

class User {
  constructor(userName) {
    this.username = userName
  }

  getUsername() {
    return this.username
  }

  setUsername(userName) {
    this.username = userName
  }
}

class ChatUser extends User {
  constructor(userName) {
    super(userName)
    this.warning = 0
  }

  giveWarning() {
    this.warning++
  }

  getWarningCount() {
    return this.warning
  }
}

async function getNumTransactions(username) {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
  // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
  const userRes = await axios.get(`https://jsonmock.hackerrank.com/api/article_users?username=${username}`)
  const user = userRes.data.data

  if (!user.length) return "Username Not Found"
  else {
    const { id } = user[0]
    const transRes = await axios.get(`https://jsonmock.hackerrank.com/api/transactions?&userId=${id}`)

    return transRes.data.total
  }
}