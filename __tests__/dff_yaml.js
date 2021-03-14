import { test, expect } from '@jest/globals';
// import path from 'path';
import getDiff from '../src/get_diff_two_files.js';
import { createFixturesPath } from '../src/utils.js';

test('gendiff flat YAML', () => {
  const diff = getDiff(createFixturesPath('yaml/file1.yml'), createFixturesPath('yaml/file2.yml'));

  expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff deep YAML', () => {
  const diff = getDiff(createFixturesPath('yaml/file_deep1.yml'), createFixturesPath('yaml/file_deep2.yml'));

  expect(diff).toBe(`{
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
}`);
});
