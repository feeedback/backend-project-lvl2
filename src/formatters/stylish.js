import _ from 'lodash';
import createDiffTree from '../create_diff.js';

const stringify = (obj, indentCount = 0, indentStep = 4) => {
  if (!_.isPlainObject(obj)) {
    return obj;
  }
  const indent = ' '.repeat(indentCount + indentStep);
  const keysSorted = _.sortBy(Object.keys(obj));

  const body = keysSorted.map(
    (key) => `${indent}${key}: ${stringify(obj[key], indentCount + indentStep, indentStep)}`,
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
      if (children) {
        return [...acc, `${indent2}  ${key}: ${getDifferenceByKeyValue(children, nowIndent)}`];
      }

      const mapTypeDiffToStr = {
        no_changed: () => [],
        added: () => [`${indent2}  ${key}: ${stringify(value, nowIndent)}`],
        updated: () => {
          const [old, now] = value;
          return [
            [
              `${indent2}- ${key}: ${stringify(old, nowIndent)}`,
              `${indent2}+ ${key}: ${stringify(now, nowIndent)}`,
            ].join('\n'),
          ];
        },
        removed: () => [`${indent2}- ${key}: ${stringify(value, nowIndent)}`],

      };

      return [...acc, ...mapTypeDiffToStr[type]];
    }, []);

  const diff = ['{', diffBody.join('\n'), `${' '.repeat(indent)}}`];
  return diff.join('\n');
};

export default (objA, objB) => {
  const diffAST = createDiffTree(objA, objB);

  return getDifferenceByKeyValue(diffAST);
};
