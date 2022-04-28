module.exports = {
  root: true,
  env: {
    // es6: true,
    // es2017: true,
    es2018: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["off"],
    // quotes: ["error", "double"],
    "destructuring": ["off"],
    "prefer-const": ["off"],
    "max-len": ["off"],
    "linebreak-style": ["off"],
    "no-multiple-empty-lines": ["off"],
  },
};
