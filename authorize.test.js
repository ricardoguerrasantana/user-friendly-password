const { authorize, hashPassword } = require("./authEvents.js")

describe("authorize", () => {
  const P = 131
  const M = 1e9 + 7

  test("should return true for correct password hash", () => {
    const password = "password123"
    const correctHash = hashPassword(password, P, M)
    expect(authorize(correctHash, password, P, M)).toBe(true)
  })

  test("should return false for incorrect password hash", () => {
    const password = "password123"
    const incorrectHash = 123456789
    expect(authorize(incorrectHash, password, P, M)).toBe(false)
  })

  test("should return true for hash with appended character", () => {
    const password = "admin"
    const correctAppendedHash =
      (hashPassword(password, P, M) * P + "1".charCodeAt(0)) % M
    expect(authorize(correctAppendedHash, password, P, M)).toBe(true)
  })

  test("should return false if no hash matches", () => {
    const password = "wrongpassword"
    const randomHash = 999999999
    expect(authorize(randomHash, password, P, M)).toBe(false)
  })
})
