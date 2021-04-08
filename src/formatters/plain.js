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

    const keysPathStr = keysPath.join('.');

    const mapTypeDiffToStr = {
      no_changed: [],
      added: [`Property '${keysPathStr}' was added with value: ${getValueStr(value)}`],
      updated: [`Property '${keysPathStr}' was updated. From ${getValueStr(value[0])} to ${getValueStr(value[1])}`],
      removed: [`Property '${keysPathStr}' was removed`],
    };

    return [...acc, ...mapTypeDiffToStr[type]];
  }, [],
);

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return getDifferenceByKeyValue(diffAST).join('\n');
};
