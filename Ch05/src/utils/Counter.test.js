import "regenerator-runtime/runtime"
import Counter from "./Counter"
import { addTwoNumbers } from "./math"

// need to comment out this line below if you want to use the real addTwoNumbers; otherwise addTwoNumbers will return undefined. 
jest.mock("./math") // 製作替身

test("The default value of count of the counter will be 0", () => {
  // Arange
  const counter = new Counter()
  const expected = 0

  // Assert
  expect(counter.count).toBe(expected)
})

test("The count will be from 0 become 1 if I first executed increment method.", () => {
  // Arange
  addTwoNumbers.mockReturnValue(1) // 設置回傳值
  const counter = new Counter()
  const expected = 1
  // Act
  counter.increment()

  const answer = addTwoNumbers(2,3)

  // Assert
  expect(answer).toBe(expected)
})

test("The count will become value of response after executed serCountFromDatabase.", async () => {
  // Arrange
  global.fetch = jest.fn().mockResolvedValue({ json: () => ({ count: 5 }) })
  const counter = new Counter()
  const expected = 5

  // Act
  await counter.setCountFromDatabase()

  // Assert
  expect(counter.count).toBe(expected)

  delete global.fetch
})
