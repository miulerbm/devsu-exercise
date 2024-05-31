import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["node_modules/(?!react-native|react-navigation)/"],
};

export default config;
