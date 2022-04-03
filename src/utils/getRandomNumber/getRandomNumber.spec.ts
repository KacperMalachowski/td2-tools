import getRandomNumber from ".";

describe("Get random number in range", () => {
  it('should return numbeer from specific range', () => {
    let max = 10;
    let min = 2;

    let numbeer = getRandomNumber(min, max);

    expect(numbeer).toBeGreaterThanOrEqual(min);
    expect(numbeer).toBeLessThanOrEqual(max);
  })
})