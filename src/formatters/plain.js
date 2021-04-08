import _ from 'lodash';
import createDiffTree from '../create_diff.js';

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getDifferenceByKeyValue = (diffAST, keysAcc = []) => Object.values(diffAST).reduce(
  (acc, {
    key, children, type, value,
  }) => {
    const keysPath = [...keysAcc, key];
    if (children) {
      return [...acc, ...getDifferenceByKeyValue(children, keysPath)];
    }

    if (type === 'no_changed') {
      return acc; // nothing
    }
    const keysPathStr = keysPath.join('.');

    let str = '';
    if (type === 'added') {
      str = `Property '${keysPathStr}' was added with value: ${getValueStr(value)}`;
    }
    if (type === 'updated') {
      const [old, now] = value;
      str = `Property '${keysPathStr}' was updated. From ${getValueStr(old)} to ${getValueStr(now)}`;
    }
    if (type === 'removed') {
      str = `Property '${keysPathStr}' was removed`;
    }

    return [...acc, str];
  }, [],
);

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return getDifferenceByKeyValue(diffAST).join('\n');
};
