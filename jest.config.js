module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  globals: {
    "BACKEND_URL": "http://localhost:8090/api"
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};
