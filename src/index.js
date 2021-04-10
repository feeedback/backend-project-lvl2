import fs from 'fs';
import path from 'path';
import getParsedData from './parsers.js';
import createDiffTree from './create_diff.js';
import getFormatterDiff from './formatters/index.js';

const readFileAndParse = (pathToFile) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), pathToFile));
  const fileExt = path.extname(pathToFile).slice(1);
  const fileData = getParsedData(fileExt, file);

  return fileData;
};

const getDifferenceTwoFile = (pathToFile1, pathToFile2, format = 'stylish') => {
  const diffAST = createDiffTree(readFileAndParse(pathToFile1), readFileAndParse(pathToFile2));

  const formatterFn = getFormatterDiff(format);

  return formatterFn(diffAST);
};

export default getDifferenceTwoFile;
