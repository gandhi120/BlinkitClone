module.exports = {
  project: {
    ios: {},
    android: {},
  },
  //library config for specific platform.Autolinking null for ios.WE link inside info.plist.
  'react-native-vector-icons': {
    platforms: {
      ios: null,
    },
  },
  //ADD ASSETS FOLDER PATH FOR LINKING ASSETS
  assets: ['./src/assets/fonts/'],

  //ADD BUNDLER PATH WHICH IS TRANSFORM TYPESCRIPT TO JAVASCRIPT
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  //WHAT FILE YOU CONVERT IT INTO JS
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
