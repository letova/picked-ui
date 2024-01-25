module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/packages/base', '<rootDir>/packages/blossom'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|glb)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/dist'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  testEnvironment: 'jsdom',
};
