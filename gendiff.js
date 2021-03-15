#!/usr/bin/env node

import program from 'commander';
import getDifferenceTwoFile from './src/generate_diff_file.js';

program
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    console.log(getDifferenceTwoFile(pathToFile1, pathToFile2, program.format));
  })
  .parse();
