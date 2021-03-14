import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import getParsedData from './parsers.js';
import getDifferenceByKeyValue from './stylish.js';

const getDifferenceTwoFile = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), pathToFile1));
  const file2 = fs.readFileSync(path.resolve(process.cwd(), pathToFile2));

  const file1Data = getParsedData(path.extname(pathToFile1).slice(1), file1);
  const file2Data = getParsedData(path.extname(pathToFile2).slice(1), file2);

  return getDifferenceByKeyValue(file1Data, file2Data);
};

export default getDifferenceTwoFile;
