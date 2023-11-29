
const multiply = (number1:number, number2:number) => {
  return number1 * number2
}
test("Multiply 2*2 should return 4", () => {
  expect(multiply(2, 2)).toBe(4)
})