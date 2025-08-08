#!/usr/bin/env node
import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.js';

console.log('Building tokens...');

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('✅ Done!');
