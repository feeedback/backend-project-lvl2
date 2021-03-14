import _ from 'lodash';

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getDifferenceByKeyValue = (objA, objB, keys = []) => {
  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diff = keysAllSorted.map((key) => {
    const keysPath = [...keys, key].join('.');

    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      return getDifferenceByKeyValue(objA[key], objB[key], [...keys, key]);
    }
    if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          return null; // nothing
        }
        return `Property '${keysPath}' was updated. From ${getValueStr(objA[key])} to ${getValueStr(
          objB[key],
        )}`;
      }
      return `Property '${keysPath}' was removed`;
    }
    return `Property '${keysPath}' was added with value: ${getValueStr(objB[key])}`;
  });

  return diff.filter(Boolean).join('\n');
};

export default getDifferenceByKeyValue;
