function authEvents(events) {
  const P = 131
  const M = 1e9 + 7

  let password
  let passwordHash
  const result = []

  for (let event of events)
  {
    let eventType = event[0]
    let parameter = event[1]

    if (eventType === "setPassword") {
      password = parameter
      passwordHash = hashPassword(password, P, M)
    } else if (eventType === "authorize") {
      let hashValue = parseInt(parameter)
      authorize(hashValue, password, P, M) ? result.push(1) : result.push(0)
    }
  }

  return result
}

function hashPassword(password, P, M) {
  let passwordHash = 0
  for (let i = 0; i < password.length; i++) {
    passwordHash = (passwordHash * P + password.charCodeAt(i)) % M
  }
  return passwordHash
}

function authorize(hashValue, password, P, M) {
  let passwordHash = hashPassword(password, P, M)
  if (passwordHash === hashValue) {
    return true
  }
  
  for (let i = 48; i <= 122; i++) {
    if ((i >= 48 && i <= 57) || (i >= 65 && i <= 90) || (i >= 97 && i <= 122)) {
      const appendedHash = (passwordHash * P + i) % M
      if (appendedHash === hashValue) {
        return true
      }
    }
  }

  return false
}

module.exports = {authEvents, hashPassword, authorize}