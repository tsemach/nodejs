import { sum } from '../src/sum'

describe("sum test", () => {
  test('adding 1 + 2 equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  }) 
})