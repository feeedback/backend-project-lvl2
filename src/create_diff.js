import _ from 'lodash';

const getDifferenceByKeyValue = (objA, objB) => {
  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diff = keysAllSorted.map((key) => {
    const oldValue = objA[key];
    const newValue = objB[key];
    const node = { key };

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      node.children = getDifferenceByKeyValue(oldValue, newValue);

      return node;
    }

    if (oldValue === newValue) {
      node.type = 'no_changed';
      node.value = oldValue;

      return node;
    }

    if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        node.type = 'updated';
        node.value = [oldValue, newValue];
      } else {
        node.type = 'removed';
        node.value = oldValue;
      }
    } else {
      node.type = 'added';
      node.value = newValue;
    }

    return node;
  });

  return diff;
};

export default (objA, objB) => getDifferenceByKeyValue(objA, objB);
