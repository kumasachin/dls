#!/usr/bin/env node

/**
 * This script helps set up Chromatic for visual regression testing
 * Run with: node scripts/setup-chromatic.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Chromatic Setup Helper');
console.log('----------------------');
console.log('This script will help you set up Chromatic for visual regression testing.\n');

rl.question('Do you want to install Chromatic now? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    console.log('\nInstalling Chromatic...');
    try {
      execSync('npm install --save-dev chromatic', { stdio: 'inherit' });

      console.log('\nChromatic installed successfully!');

      rl.question(
        '\nDo you want to add a Chromatic script to package.json? (y/n): ',
        (addScript) => {
          if (addScript.toLowerCase() === 'y') {
            try {
              const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

              packageJson.scripts = packageJson.scripts || {};
              packageJson.scripts.chromatic = 'chromatic --exit-zero-on-changes';

              fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
              console.log('\nAdded Chromatic script to package.json!');

              console.log(
                '\nTo run Chromatic, use: npm run chromatic -- --project-token=YOUR_TOKEN'
              );
              console.log(
                'You can get your project token by signing up at https://www.chromatic.com/'
              );
            } catch (error) {
              console.error('\nError updating package.json:', error.message);
            }
          }

          console.log('\nChromatic setup complete!');
          rl.close();
        }
      );
    } catch (error) {
      console.error('\nError installing Chromatic:', error.message);
      rl.close();
    }
  } else {
    console.log('\nSkipping Chromatic installation.');
    rl.close();
  }
});
