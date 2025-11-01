module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json", useESM: true }]
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      useESM: true
    }
  },
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  coverageDirectory: "coverage",
  globalSetup: "<rootDir>/tests/globalSetup.mjs",
};
