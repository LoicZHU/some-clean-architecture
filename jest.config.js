module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {"\\.ts$": ['ts-jest']},
  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*.)+(test).+(ts)'],
};
