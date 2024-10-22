const { authEvents } = require("./authEvents.js")

describe("authEvents", () => {
  test("Example test", () => {
    events = [
      ["setPassword", "cAr1"],
      ["authorize", "223691457"],
      ["authorize", "303580761"],
      ["authorize", "100"],
      ["setPassword", "d"],
      ["authorize", "100"],
    ]
    expect(authEvents(events)).toStrictEqual([1, 1, 0, 1])
  })

  test("Test Case 0", () => {
    events = [
      ["4"],
      ["2"],
      ["setPassword", "000A"],
      ["authorize", "108738450"],
      ["authorize", "108738449"],
      ["authorize", "244736787"],
    ]
    expect(authEvents(events)).toStrictEqual([0, 1, 1])
  })

  test("Test Case 1", () => {
    events = [
      ["5"],
      ["2"],
      ["setPassword", "1"],
      ["setPassword", "2"],
      ["setPassword", "3"],
      ["authorize", "49"],
      ["authorize", "50"],
    ]
    expect(authEvents(events)).toStrictEqual([0, 0])
  })

  test("Test Case 2", () => {
    events = [
      ["8"],
      ["2"],
      ["setPassword", "a"],
      ["authorize", "97"],
      ["authorize", "12756"],
      ["authorize", "12804"],
      ["authorize", "12829"],
      ["authorize", "12772"],
      ["authorize", "12797"],
      ["authorize", "98"],
    ]
    expect(authEvents(events)).toStrictEqual([1, 1, 1, 1, 1, 1, 0])
  })

  test("should return correct authorization results with valid and invalid hashes", () => {
    const events = [
      ["setPassword", "password123"],
      ["authorize", "409487796"], // Should return 1 (correct hash)
      ["authorize", "123456789"], // Should return 0 (incorrect hash)
    ]
    expect(authEvents(events)).toEqual([1, 0])
  })

  test("should handle multiple authorizations after setting the password", () => {
    const events = [
      ["setPassword", "admin"],
      ["authorize", "793185655"], // Should return 1 (correct hash)
      ["authorize", "888888888"], // Should return 0 (incorrect hash)
    ]
    expect(authEvents(events)).toEqual([1, 0])
  })

  test("should return empty array if no events are passed", () => {
    const events = []
    expect(authEvents(events)).toEqual([])
  })

  test("should handle edge cases like empty password", () => {
    const events = [
      ["setPassword", ""],
      ["authorize", "0"], // Empty password hash should match 0
    ]
    expect(authEvents(events)).toEqual([1])
  })
})
