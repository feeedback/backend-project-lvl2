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
      no_changed: () => [],
      added: () => [`Property '${keysPathStr}' was added with value: ${getValueStr(value)}`],
      updated: () => {
        const [old, now] = value;
        return [`Property '${keysPathStr}' was updated. From ${getValueStr(old)} to ${getValueStr(now)}`];
      },
      removed: () => [`Property '${keysPathStr}' was removed`],

    };

    return [...acc, ...mapTypeDiffToStr[type]];
  }, [],
);

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return getDifferenceByKeyValue(diffAST).join('\n');
};
