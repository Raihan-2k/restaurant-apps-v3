const sum = (a, b) => a + b;

// eslint-disable-next-line no-undef
describe('A Sample Test for Sum', () => {
  // eslint-disable-next-line no-undef
  it('should return a + b value', () => {
    // eslint-disable-next-line no-undef
    expect(sum(2, 3))
      .toEqual(5);
  });
});
