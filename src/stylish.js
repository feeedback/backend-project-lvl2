/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const stringifyObj = (obj) => {
  const res = [];
  for (const key in obj) {
    if (_.has(obj, key)) {
      if (_.isPlainObject(obj[key])) {
        res.push([key, stringifyObj(obj[key])]);
      } else {
        res.push([key, obj[key]]);
      }
    }
  }
  return res;
};
const stringifyObjFormat = (obj, indentCount = 0, indentStep = 2) => {
  const indent = ' '.repeat(indentCount + indentStep);
  const res = [];
  res.push('{');

  for (const key in obj) {
    if (_.has(obj, key)) {
      if (_.isPlainObject(obj[key])) {
        res.push(`${indent}${key}: ${stringifyObjFormat(obj[key], indentCount + indentStep, indentStep)}`);
      } else {
        res.push(`${indent}${key}: ${obj[key]}`);
      }
    }
  }
  res.push(`${' '.repeat(indentCount)}}`);
  return res.join('\n');
};

console.log(
  stringifyObjFormat({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: {
      k1: [1, 2, '3333', 4],
      follow: {
        k1: 2,
      },
    },
  }, 0, 4),
);

const getDifferenceByKeyValue = (objA, objB, indent = 0) => {
  const keysA = _.sortBy(Object.keys(objA));
  const keysB = _.sortBy(Object.keys(objB));

  const keysAll = _.uniq([...keysA, ...keysB]);

  const diff = [];
  diff.push('{');

  for (const key of keysAll) {
    if (_.isPlainObject(objA[key])) {
      diff.push(
        `${' '.repeat(indent + 2)}  ${key}: ${getDifferenceByKeyValue(objA[key], objB[key], indent + 4)}`,
      );
    } else if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          diff.push(`${' '.repeat(indent + 2)}  ${key}: ${objA[key]}`);
        } else {
          diff.push(`${' '.repeat(indent + 2)}- ${key}: ${objA[key]}`);
          diff.push(`${' '.repeat(indent + 2)}+ ${key}: ${objB[key]}`);
        }
      } else {
        diff.push(`${' '.repeat(indent + 2)}- ${key}: ${objA[key]}`);
      }
    } else {
      diff.push(`${' '.repeat(indent + 2)}+ ${key}: ${objB[key]}`);
    }
  }

  diff.push(`${' '.repeat(indent)}}`);
  return diff.join('\n');
};

// export default getDifferenceByKeyValue;
