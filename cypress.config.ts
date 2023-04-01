import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--enable-features=SharedArrayBuffer');
          return launchOptions;
        }

        if (browser.name === 'firefox') {
          launchOptions.args.push('--enable-features=SharedArrayBuffer');
          return launchOptions;
        }

        return launchOptions;
      });
    },
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
