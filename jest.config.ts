
import type { Config } from "jest";

const config: Config = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    watchPathIgnorePatterns: [".*\.json$", ".*\.csv$"],
};

export default config;
    