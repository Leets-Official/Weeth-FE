// jest.config.cjs
module.exports = {
  preset: 'ts-jest/presets/default-esm', // ESM 모드용 preset
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true, // ESM 모드 활성화
        tsconfig: './tsconfig.jest.json', // Jest 전용 tsconfig 파일 지정
      },
    ],
  },
};
