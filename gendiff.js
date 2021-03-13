#!/usr/bin/env node
import { program } from 'commander';
import getDifferenceTwoFile from './src/get_diff_two_files.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'plain')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    console.log(getDifferenceTwoFile(pathToFile1, pathToFile2));
  });

program.parse();

export default getDifferenceTwoFile;
