import { test, expect } from '@jest/globals';
import { createFixturesPath } from '../src/utils.js';
import getDiff from '../src/get_diff_two_files.js';

// const expectedRaw = [

//   {
//     key: 'common',
//     children: [
//       { key: 'follow', added: false },
//       { key: 'setting1', same: 'Value 1' },
//       { key: 'setting2', removed: 200 },
//       { key: 'setting3', updated: [true, null] },
//       { key: 'setting4', added: 'blah blah' },
//       { key: 'setting5', added: { key5: 'value5' } },
//       {
//         key: 'setting6',
//         children: [
//           {
//             key: 'doge',
//             children: [{ key: 'wow', updated: ['', 'so much'] }],
//           },
//           { key: 'key', same: 'value' },
//           { key: 'ops', added: 'vops' },
//         ],
//       },
//     ],
//   },
//   {
//     key: 'group1',
//     children: [
//       { key: 'baz', updated: ['bas', 'bars'] },
//       { key: 'foo', same: 'bar' },
//       { key: 'nest', updated: [{ key: 'value' }, 'str'] },
//     ],
//   },
//   {
//     key: 'group2',
//     removed: { abc: 12345, deep: { id: 45 } },
//   },
//   {
//     key: 'group3',
//     added: { deep: { id: { number: 45 } }, fee: 100500 },
//   },
// ];
const expectedRaw = 
const expected = JSON.stringify(expectedRaw);

test('gendiff deep JSON', () => {
  const diff = getDiff(
    createFixturesPath('json/file_deep1.json'),
    createFixturesPath('json/file_deep2.json'),
    'json',
  );

  expect(diff).toBe(expected);
});

test('gendiff deep YAML', () => {
  const diff = getDiff(
    createFixturesPath('yaml/file_deep1.yml'),
    createFixturesPath('yaml/file_deep2.yml'),
    'json',
  );

  expect(diff).toBe(expected);
});
