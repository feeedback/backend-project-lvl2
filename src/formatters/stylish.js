import _ from 'lodash';
import createDiffTree from '../create_diff.js';

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

const getDifferenceByKeyValue = (diffAST, indent = 0, indentStep = 4) => {
  const nowIndent = indent + indentStep;
  const indent2 = ' '.repeat(indent + 2);

  const diffBody = Object.values(diffAST)
    .reduce((acc, {
      key, children, type, value,
    }) => {
      let str = '';
      if (children) {
        str += `${indent2}  ${key}: ${getDifferenceByKeyValue(children, nowIndent)}`;
      }

      if (type === 'no_changed') {
        str += `${indent2}  ${key}: ${stringifyValue(value, nowIndent)}`;
      }

      if (type === 'added') {
        str += `${indent2}+ ${key}: ${stringifyValue(value, nowIndent)}`;
      }
      if (type === 'updated') {
        const [old, now] = value;
        str += `${indent2}- ${key}: ${stringifyValue(old, nowIndent)}`;
        str += '\n';
        str += `${indent2}+ ${key}: ${stringifyValue(now, nowIndent)}`;
      }
      if (type === 'removed') {
        str += `${indent2}- ${key}: ${stringifyValue(value, nowIndent)}`;
      }

      return [...acc, str];
    }, []);

  const diff = ['{', diffBody.join('\n'), `${' '.repeat(indent)}}`];
  return diff.join('\n');
};

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return getDifferenceByKeyValue(diffAST);
};
