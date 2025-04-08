module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          schemas: './src/schemas',
          styles: './src/styles',
          theme: './src/theme',
          tests: './tests',
          utils: './src/utils',
        },
      },
    ],
  ],
};
