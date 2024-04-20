import { arrayIncludesArray } from "./array-search";

test('correctly shows when array is not in array', () => {
  expect(arrayIncludesArray([[1, 2], [1, 4, 3]], [1, 3])).toBe(false);
})

test('correctly shows when array is in array', () => {
  expect(arrayIncludesArray([[1, 2], [1, 4, 3]], [1, 4, 3], true)).toBe(1);
})