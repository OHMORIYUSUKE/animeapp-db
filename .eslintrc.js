module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  globals: {
    Atomics: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2016,
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["build/index.js"],
  rules: {},
};
