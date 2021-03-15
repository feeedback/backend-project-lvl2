import _ from 'lodash';

const getDifferenceByKeyValue = (objA, objB) => {
  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diff = keysAllSorted.map((key) => {
    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      return { key, children: getDifferenceByKeyValue(objA[key], objB[key]) };
    }
    if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          return { key, type: 'no_changed', value: objA[key] };
        }
        return { key, type: 'updated', value: [objA[key], objB[key]] };
      }
      return { key, type: 'removed', value: objA[key] };
    }
    return { key, type: 'added', value: objB[key] };
  });

  return JSON.stringify(diff);
};
export default getDifferenceByKeyValue;
