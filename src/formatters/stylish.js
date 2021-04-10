import _ from 'lodash';

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

const createDiffFormatted = (diffAST, indent = 0, indentStep = 4) => {
  const nowIndent = indent + indentStep;
  const indent2 = ' '.repeat(indent + 2);

  const diffBody = Object.values(diffAST)
    .reduce((acc, {
      key, children, type, value,
    }) => {
      if (children) {
        return [...acc, `${indent2}  ${key}: ${createDiffFormatted(children, nowIndent)}`];
      }

      const mapTypeDiffToStr = {
        no_changed: [`${indent2}  ${key}: ${stringify(value, nowIndent)}`],
        added: [`${indent2}+ ${key}: ${stringify(value, nowIndent)}`],
        updated: [
          [
            `${indent2}- ${key}: ${stringify(value[0], nowIndent)}`,
            `${indent2}+ ${key}: ${stringify(value[1], nowIndent)}`,
          ].join('\n'),
        ],
        removed: [`${indent2}- ${key}: ${stringify(value, nowIndent)}`],
      };

      return [...acc, ...mapTypeDiffToStr[type]];
    }, []);

  const diff = ['{', diffBody.join('\n'), `${' '.repeat(indent)}}`];
  return diff.join('\n');
};

export default (diffAST) => createDiffFormatted(diffAST);
