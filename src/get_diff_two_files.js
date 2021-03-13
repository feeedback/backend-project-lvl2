import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getDifferenceByKeyValue = (objA, objB) => {
  const keysA = _.sortBy(Object.keys(objA));
  const keysB = _.sortBy(Object.keys(objB));

  const keysAll = _.uniq([...keysA, ...keysB]);

  const diff = ['{'];
  // eslint-disable-next-line no-restricted-syntax
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

  return diff.join('\n  ').concat('\n}');
};

const getDifferenceTwoFile = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), pathToFile1));
  const file2 = fs.readFileSync(path.resolve(process.cwd(), pathToFile2));

  const file1Data = JSON.parse(file1);

  const file2Data = JSON.parse(file2);

  return getDifferenceByKeyValue(file1Data, file2Data);
};

export default getDifferenceTwoFile;
