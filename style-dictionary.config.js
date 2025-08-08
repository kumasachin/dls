export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    'css-dark': {
      transformGroup: 'css',
      buildPath: 'src/tokens/dist/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          filter(token) {
            return token.path[0] === 'color' && token.path[1] === 'dark';
          },
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module',
        },
      ],
    },
  },
};
