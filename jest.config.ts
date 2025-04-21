import type { Config } from "jest";

const config: Config = {
  preset: 'react-native',  // Uses React Native preset
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',  // Transforms JS/TS files using babel-jest
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-reanimated|@react-native|@react-navigation)/)',  // Allow transformation of specific node_modules
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/mocks/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js",// Setup for react-native-gesture-handler
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  globals: {
    __DEV__: true,
  },
};

export default config;
