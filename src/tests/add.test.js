const add = (a, b) => a + b;

test('add two numbers', () => {
  const arg1 = 3;
  const arg2 = 4;
  const expected = 7;
  const result = add(arg1, arg2);
  expect(result).toBe(expected);
});
