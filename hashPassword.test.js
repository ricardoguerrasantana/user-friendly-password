const { hashPassword } = require("./authEvents.js")

describe("hashPassword", () => {
  const P = 131
  const M = 1e9 + 7

  test("should return correct hash for a given password", () => {
    expect(hashPassword("password123", P, M)).toBe(409487796)
  })

  test("should return correct hash for an empty password", () => {
    expect(hashPassword("", P, M)).toBe(0) // Hash of empty string should be 0
  })

  test("should return same hash for identical passwords", () => {
    const hash1 = hashPassword("samePassword", P, M)
    const hash2 = hashPassword("samePassword", P, M)
    expect(hash1).toBe(hash2)
  })

  test("should return different hash for different passwords", () => {
    const hash1 = hashPassword("password1", P, M)
    const hash2 = hashPassword("password2", P, M)
    expect(hash1).not.toBe(hash2)
  })
})
