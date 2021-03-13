const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const getDifferenceByKeyValue = (entriesA, entriesB) => {
    const keysAll = _.uniq([...entriesA.map(([key]) => key), ...entriesB.map(([key]) => key)]);
    
    for (const key of keysAll) {
      
  }
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'plain')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    console.log('path1 :>> ', pathToFile1);
    console.log('path2 :>> ', pathToFile2);

    const file1 = fs.readFileSync(path.resolve(process.cwd(), pathToFile1));
    const file2 = fs.readFileSync(path.resolve(process.cwd(), pathToFile2));

    const file1Data = JSON.parse(file1);
    const file2Data = JSON.parse(file2);

    const file1DataKeyValue = _.sortBy(Object.entries(file1Data), ([key, value]) => key);
    const file2DataKeyValue = _.sortBy(Object.entries(file2Data), ([key, value]) => key);

    console.log(getDifferenceByKeyValue(file1DataKeyValue));
    console.log(getDifferenceByKeyValue(file2DataKeyValue));
  });

program.parse();
