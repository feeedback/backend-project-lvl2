/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

// const stringifyObj = (obj) => {
//   const res = [];
//   for (const key in obj) {
//     if (_.has(obj, key)) {
//       if (_.isPlainObject(obj[key])) {
//         res.push([key, stringifyObj(obj[key])]);
//       } else {
//         res.push([key, obj[key]]);
//       }
//     }
//   }
//   return res;
// };

const stringifyValue = (obj, indentCount = 0, indentStep = 4) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const indent = ' '.repeat(indentCount + indentStep);
  const keysSorted = _.sortBy(Object.keys(obj));

  const res = [];
  res.push('{');

  for (const key of keysSorted) {
    res.push(`${indent}${key}: ${stringifyValue(obj[key], indentCount + indentStep, indentStep)}`);
  }

  res.push(`${' '.repeat(indentCount)}}`);
  return res.join('\n');
};

const getDifferenceByKeyValue = (objA, objB, indent = 0, indentStep = 4) => {
  const nowIndent = indent + indentStep;
  const indent2 = ' '.repeat(indent + 2);

  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diff = [];
  diff.push('{');

  for (const key of keysAllSorted) {
    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      diff.push(`${indent2}  ${key}: ${getDifferenceByKeyValue(objA[key], objB[key], nowIndent)}`);
    } else if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          diff.push(`${indent2}  ${key}: ${stringifyValue(objA[key], nowIndent)}`);
        } else {
          diff.push(`${indent2}- ${key}: ${stringifyValue(objA[key], nowIndent)}`);
          diff.push(`${indent2}+ ${key}: ${stringifyValue(objB[key], nowIndent)}`);
        }
      } else {
        diff.push(`${indent2}- ${key}: ${stringifyValue(objA[key], nowIndent)}`);
      }
    } else {
      diff.push(`${indent2}+ ${key}: ${stringifyValue(objB[key], nowIndent)}`);
    }
  }

  diff.push(`${' '.repeat(indent)}}`);
  return diff.join('\n');
};

export default getDifferenceByKeyValue;
