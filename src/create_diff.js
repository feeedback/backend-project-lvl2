import _ from 'lodash';

const getUniqKeysObjects = (objects) => _.sortBy(_.uniq(
  objects.flatMap((obj) => Object.keys(obj)),
));

const getDifferenceByKeyValue = (objA, objB) => getUniqKeysObjects([objA, objB]).map((key) => {
  const oldValue = objA[key];
  const newValue = objB[key];

  if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
    return { key, children: getDifferenceByKeyValue(oldValue, newValue) };
  }

  if (oldValue === newValue) {
    return { key, type: 'no_changed', value: oldValue };
  }

  if (_.has(objA, key)) {
    if (_.has(objB, key)) {
      return { key, type: 'updated', value: [oldValue, newValue] };
    }
    return { key, type: 'removed', value: oldValue };
  }
  return { key, type: 'added', value: newValue };
});

export default (objA, objB) => getDifferenceByKeyValue(objA, objB);
