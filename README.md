# User-Friendly Password System

A solution for the **User-Friendly Password System** challenge, which simulates an authentication system using password hashing. The system allows setting a password and authorizing login attempts based on either the correct password hash or the correct password with one additional character.

## Problem Description

The task is to implement an authentication system that:

1. **Sets a password** and computes its hash using a custom hashing function.
2. **Authorizes login attempts** by checking whether a provided integer is the hash of the current password or the hash of the password with one additional character.

The hashing function works as follows:

- The password string is hashed using the formula:
  \[
  h(s) = \left( \sum\_{i=0}^{n-1} f(s[i]) \cdot P^{n-1-i} \right) \mod M
  \]
  Where:
  - `f(x)` is the ASCII code of the character `x`.
  - `P = 131` is a constant.
  - `M = 10^9 + 7` is a large prime number.

The system should handle two types of events:

1. **`setPassword(s)`**: Sets the password to the string `s`.
2. **`authorize(x)`**: Checks if the provided integer `x` matches the hash of the current password or the hash of the password with one additional character.

## Solution

The solution is implemented in JavaScript with the following key components:

### 1. `hashPassword(password, P, M)`

Calculates the hash of the provided password using the specified hashing formula. It iterates over the characters of the password and computes the hash with the provided constants `P` and `M`.

### 2. `authorize(hashValue, passwordHash, passwordLength, P, M)`

Validates whether the provided `hashValue` matches:

- The exact hash of the current password.
- The hash of the current password with an additional character (any digit or letter).

### 3. `authEvents(events)`

Processes a series of events, either setting a password or authorizing login attempts, and returns the results of the authorization attempts as an array of integers (1 for success, 0 for failure).

## Usage

This project is an **npm project** with tests included. You can clone the repository, install the dependencies, and run the tests.

### Example Usage

```javascript
const events = [
  ["setPassword", "cAr1"],
  ["authorize", "223691457"], // Should return 1 (correct password hash)
  ["authorize", "303580761"], // Should return 1 (password + 'a' hash)
  ["authorize", "100"], // Should return 0 (invalid hash)
  ["setPassword", "d"],
  ["authorize", "100"], // Should return 1 (correct hash for password 'd')
]

console.log(authEvents(events)) // Output: [1, 1, 0, 1]
```

### Input Format

- **events**: A 2D array of events, where each event is either:
  - `["setPassword", password]` — Sets the password to `password`.
  - `["authorize", hash]` — Attempts to authorize with the provided `hash` value.

### Output Format

- Returns an array of integers representing the success (1) or failure (0) of each `authorize` event.

### Constraints

- `2 <= q <= 10^5`, where `q` is the number of events.
- Password length `s` is between 1 and 9 characters.
- `x` in `authorize(x)` is a 32-bit integer.
- Password contains only lowercase and uppercase English letters and digits.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/ricardoguerrasantana/user-friendly-password.git
cd user-friendly-password
npm install
```

## Running Tests

This project uses **Jest** for testing. To run the tests, simply use:

```bash
npm test
```

The tests cover various cases for password setting and authorization, including edge cases for short passwords and hash mismatches.

## License

This project is licensed under the MIT License.
