/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getDifferenceByKeyValue = (objA, objB, keys = []) => {
  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));
  const diff = [];

  for (const key of keysAllSorted) {
    const keysPath = [...keys, key].join('.');

    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      diff.push(getDifferenceByKeyValue(objA[key], objB[key], [...keys, key]));
    } else if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          // nothing
        } else {
          diff.push(
            `Property '${keysPath}' was updated. From ${getValueStr(objA[key])} to ${getValueStr(objB[key])}`,
          );
        }
      } else {
        diff.push(`Property '${keysPath}' was removed`);
      }
    } else {
      diff.push(`Property '${keysPath}' was added with value: ${getValueStr(objB[key])}`);
    }
  }

  return diff.join('\n');
};

export default getDifferenceByKeyValue;
