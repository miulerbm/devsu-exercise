import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "@testing-library/react-native",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\\\\\\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-native(-elements)?|@rneui)/)",
  ],
};

export default config;
