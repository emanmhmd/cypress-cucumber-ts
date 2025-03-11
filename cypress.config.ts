import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import fs from 'fs';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    async setupNodeEvents(on, config) {
      if (!fs.existsSync('cypress/reports/mocha')) {
        fs.mkdirSync('cypress/reports/mocha', { recursive: true });
      }

      config.reporter = 'mochawesome';
      config.reporterOptions = {
        reportDir: 'cypress/reports/mocha',
        overwrite: false,
        html: false,
        json: true
      };

      await addCucumberPreprocessorPlugin(on, config);
      
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          define: {
            global: 'window',
            process: '{"env":{}}',
          },
          alias: {
            crypto: 'crypto-browserify',
            stream: 'stream-browserify',
            buffer: 'buffer',
            util: 'util',
            'uuid/dist/esm-node': 'uuid'
          }
        })
      );

      on('after:run', async (results) => {
        if (results) {
          if (!fs.existsSync('cypress/cucumber-json')) {
            fs.mkdirSync('cypress/cucumber-json', { recursive: true });
          }
          
          fs.writeFileSync(
            'cypress/cucumber-json/cypress-results.json',
            JSON.stringify(results, null, 2)
          );
        }
      });

      return config;
    },
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'https://www.saucedemo.com/'
  },
});
