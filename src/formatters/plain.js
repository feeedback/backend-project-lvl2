import _ from 'lodash';

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const createDiffFormatted = (diffAST, keysAcc = []) => Object.values(diffAST).reduce((acc, {
  key, children, type, value,
}) => {
  const keysPath = [...keysAcc, key];
  if (children) {
    return [...acc, ...createDiffFormatted(children, keysPath)];
  }

  const keysPathStr = keysPath.join('.');

  const mapTypeDiffToStr = {
    no_changed: [],
    added: [`Property '${keysPathStr}' was added with value: ${getValueStr(value)}`],
    updated: [
      `Property '${keysPathStr}' was updated. From ${getValueStr(value[0])} to ${getValueStr(value[1])}`,
    ],
    removed: [`Property '${keysPathStr}' was removed`],
  };

  return [...acc, ...mapTypeDiffToStr[type]];
}, []);

export default (diffAST) => createDiffFormatted(diffAST).join('\n');
