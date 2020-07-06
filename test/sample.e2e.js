beforeAll(async () => {
  await page.goto('http://localhost:8080');
});

describe('Title', () => {
  it('should be titled "sb-data-kondoumh"', async () => {
    await expect(page.title()).resolves.toMatch('sb-data-kondoumh');
  });
});

describe('About', () =>{
  it('should be about text', async() => {
    await expect(page).toClick('.v-application--wrap > .v-sheet > .v-toolbar__content > #nav > a:nth-child(4)');
    await expect(page).toMatchElement('#app > div > main > div > div > div.v-list-item.v-list-item--two-line.theme--light > div > div.v-list-item__title.headline.mb-1', {
      visible: true,
      text: 'Scrapbox viz'
    });
  })
});
