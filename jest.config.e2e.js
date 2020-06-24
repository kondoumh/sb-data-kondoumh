module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '/test/.*\\.e2e\\.js$',
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true
}
