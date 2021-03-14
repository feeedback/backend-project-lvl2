import { test, expect } from '@jest/globals';
import { createFixturesPath } from '../src/utils.js';
import getDiff from '../src/get_diff_two_files.js';

const expected = `{
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

test('gendiff deep JSON', () => {
  const diff = getDiff(
    createFixturesPath('json/file_deep1.json'),
    createFixturesPath('json/file_deep2.json'),
    'stylish',
  );

  expect(diff).toBe(expected);
});

test('gendiff deep YAML', () => {
  const diff = getDiff(
    createFixturesPath('yaml/file_deep1.yml'),
    createFixturesPath('yaml/file_deep2.yml'),
    'stylish',
  );

  expect(diff).toBe(expected);
});
