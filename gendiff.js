#!/usr/bin/env node

import commander from 'commander';
import getDifferenceTwoFile from './src/generate_diff_file.js';

const program = new commander.Command();
program
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2, options) => {
    console.log(getDifferenceTwoFile(pathToFile1, pathToFile2, options.format));
  })
  .parse();
