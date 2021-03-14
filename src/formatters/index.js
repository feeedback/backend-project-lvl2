import getDifferenceStylish from './stylish.js';
import getDifferencePlain from './plain.js';
import getDifferenceToJson from './json.js';

const mapFormatNameToFn = {
  plain: getDifferencePlain,
  stylish: getDifferenceStylish,
  json: getDifferenceToJson,
};
const nonExistFormat = () => {
  console.log('Wrong option --format');
};

export default (formatName) => mapFormatNameToFn[formatName] ?? nonExistFormat;
