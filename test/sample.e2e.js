describe('sample', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });

  it('should be titled "sb-data-kondoumh"', async () => {
    await expect(page.title()).resolves.toMatch('sb-data-kondoumh');
  });
});
