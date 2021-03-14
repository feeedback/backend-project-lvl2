/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const getDifferenceByKeyValue = (objA, objB) => {
  const keysAllSorted = _.sortBy(_.uniq([...Object.keys(objA), ...Object.keys(objB)]));

  const diff = [];

  for (const key of keysAllSorted) {
    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      diff.push({ key, children: getDifferenceByKeyValue(objA[key], objB[key]) });
    } else if (_.has(objA, key)) {
      if (_.has(objB, key)) {
        if (objA[key] === objB[key]) {
          diff.push({ key, type: 'no_changed', value: objA[key] });
        } else {
          diff.push({ key, type: 'update', value: [objA[key], objB[key]] });
        }
      } else {
        diff.push({ key, type: 'remove', value: objA[key] });
      }
    } else {
      diff.push({ key, type: 'add', value: objB[key] });
    }
  }

  return diff.join('\n');
};

// function stringifyValue(obj, type) {
//   const keys = _.sortBy(Object.keys(obj));

//   const createLeafNode = (key) => ({ key, type, value: obj[key] });
//   const createNode = (key) => ({ key, children: stringifyValue(obj[key]) });

//   return keys.map((key) => (_.isPlainObject(obj[key]) ? createNode(key) : createLeafNode(key)));
// }

// console.log(
//   JSON.stringify(
//     stringifyValue({
//       host: 'hexlet.io',
//       timeout: 50,
//       proxy: '123.234.53.22',
//       follow: {
//         k1: 'v1',
//         k2: 'v2',
//       },
//     }),
//     null,
//     2,
//   ),
// );
export default getDifferenceByKeyValue;
