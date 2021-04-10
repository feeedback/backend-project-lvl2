import getDifferenceStylish from './stylish.js';
import getDifferencePlain from './plain.js';
import getDifferenceToJson from './json.js';

const mapFormatNameToFn = {
  plain: getDifferencePlain,
  stylish: getDifferenceStylish,
  json: getDifferenceToJson,
};

export default (formatName) => {
  const fn = mapFormatNameToFn[formatName];

  if (!fn) {
    return () => {
      console.log('Wrong option --format');
    };
  }
  return fn;
};
