module.exports = {
  preset: "ts-jest",                   
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFiles: ["<rootDir>/tests/setupEnv.cjs"],   
  globalSetup: "<rootDir>/tests/globalSetup.cjs", 
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  coverageDirectory: "coverage",
  clearMocks: true,
};