module.exports = {
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
};