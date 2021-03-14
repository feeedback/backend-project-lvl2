import getDifferenceStylish from './stylish.js';
import getDifferencePlain from './plain.js';

const mapFormatNameToFn = {
  plain: getDifferencePlain,
  stylish: getDifferenceStylish,
};

export default (formatName) => mapFormatNameToFn[formatName];
