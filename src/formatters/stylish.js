import _ from 'lodash';

const stringifyValue = (obj, indentCount = 0, indentStep = 4) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const indent = ' '.repeat(indentCount + indentStep);
  const keysSorted = _.sortBy(Object.keys(obj));

  const body = keysSorted.map(
    (key) => `${indent}${key}: ${stringifyValue(obj[key], indentCount + indentStep, indentStep)}`,
  );

  return ['{', body.join('\n'), `${' '.repeat(indentCount)}}`].join('\n');
};

const getDifferenceByKeyValue = (objA, objB, indent = 0, indentStep = 4) => {
  const nowIndent = indent + indentStep;
  const indent2 = ' '.repeat(indent + 2);

  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diffBody = keysAllSorted.map((key) => {
    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      return `${indent2}  ${key}: ${getDifferenceByKeyValue(objA[key], objB[key], nowIndent)}`;
    }
    if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          return `${indent2}  ${key}: ${stringifyValue(objA[key], nowIndent)}`;
        }
        return `${indent2}- ${key}: ${stringifyValue(objA[key], nowIndent)}
${indent2}+ ${key}: ${stringifyValue(objB[key], nowIndent)}`;
      }
      return `${indent2}- ${key}: ${stringifyValue(objA[key], nowIndent)}`;
    }
    return `${indent2}+ ${key}: ${stringifyValue(objB[key], nowIndent)}`;
  });

  const diff = ['{', diffBody.join('\n'), `${' '.repeat(indent)}}`];
  return diff.join('\n');
};

export default getDifferenceByKeyValue;
