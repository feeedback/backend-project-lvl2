import { test, expect } from '@jest/globals';
import { createFixturesFilePath } from '../src/utils.js';
import getDiff from '../src/generate_diff_file.js';

const filepathJsonA = createFixturesFilePath('json/file_deep1.json');
const filepathJsonB = createFixturesFilePath('json/file_deep2.json');

const filepathYamlA = createFixturesFilePath('yaml/file_deep1.yml');
const filepathYamlB = createFixturesFilePath('yaml/file_deep2.yml');

const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expectedJSON = [
  {
    key: 'common',
    children: [
      { key: 'follow', type: 'added', value: false },
      { key: 'setting1', type: 'no_changed', value: 'Value 1' },
      { key: 'setting2', type: 'removed', value: 200 },
      { key: 'setting3', type: 'updated', value: [true, null] },
      { key: 'setting4', type: 'added', value: 'blah blah' },
      { key: 'setting5', type: 'added', value: { key5: 'value5' } },
      {
        key: 'setting6',
        children: [
          {
            key: 'doge',
            children: [{ key: 'wow', type: 'updated', value: ['', 'so much'] }],
          },
          { key: 'key', type: 'no_changed', value: 'value' },
          { key: 'ops', type: 'added', value: 'vops' },
        ],
      },
    ],
  },
  {
    key: 'group1',
    children: [
      { key: 'baz', type: 'updated', value: ['bas', 'bars'] },
      { key: 'foo', type: 'no_changed', value: 'bar' },
      { key: 'nest', type: 'updated', value: [{ key: 'value' }, 'str'] },
    ],
  },
  {
    key: 'group2',
    type: 'removed',
    value: { abc: 12345, deep: { id: 45 } },
  },
  {
    key: 'group3',
    type: 'added',
    value: { deep: { id: { number: 45 } }, fee: 100500 },
  },
];

test('deep diff JSON files. format "stylish" (default)', () => {
  expect(getDiff(filepathJsonA, filepathJsonB)).toBe(expectedStylish);
});
test('deep diff YAML files. format "stylish" (default)', () => {
  expect(getDiff(filepathYamlA, filepathYamlB)).toBe(expectedStylish);
});

test('deep diff JSON files. format "plain"', () => {
  expect(getDiff(filepathJsonA, filepathJsonB, 'plain')).toBe(expectedPlain);
});
test('deep diff YAML files. format "plain"', () => {
  expect(getDiff(filepathYamlA, filepathYamlB, 'plain')).toBe(expectedPlain);
});

test('deep diff JSON files. format "json"', () => {
  expect(getDiff(filepathJsonA, filepathJsonB, 'json')).toStrictEqual(expectedJSON);
});
test('deep diff YAML files. format "json"', () => {
  expect(getDiff(filepathYamlA, filepathYamlB, 'json')).toStrictEqual(expectedJSON);
});
