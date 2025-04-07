module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          styles: './src/styles',
          tests: './tests',
          utils: './src/utils',
        },
      },
    ],
  ],
};
