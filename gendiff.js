#!/usr/bin/env node.
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const getDifferenceByKeyValue = (objA, objB) => {
  const keysA = _.sortBy(Object.keys(objA));
  const keysB = _.sortBy(Object.keys(objB));

  const keysAll = _.uniq([...keysA, ...keysB]);

  const diff = [`{`];
  for (const key of keysAll) {
    if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          diff.push(`  ${key}: ${objA[key]}`);
        } else {
          diff.push(`- ${key}: ${objA[key]}`);
          diff.push(`+ ${key}: ${objB[key]}`);
        }
      } else {
        diff.push(`- ${key}: ${objA[key]}`);
      }
    } else {
      diff.push(`+ ${key}: ${objB[key]}`);
    }
  }

  diff.push('}');
  return diff.join(' \n  ');
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'plain')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    const file1 = fs.readFileSync(path.resolve(process.cwd(), pathToFile1));
    const file2 = fs.readFileSync(path.resolve(process.cwd(), pathToFile2));

    const file1Data = JSON.parse(file1);
    const file2Data = JSON.parse(file2);

    console.log(getDifferenceByKeyValue(file1Data, file2Data));
  });

program.parse();
