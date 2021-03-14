import { test, expect } from '@jest/globals';
// import path from 'path';
import { createFixturesPath } from '../src/utils.js';
import getDiff from '../src/get_diff_two_files.js';

test('gendiff flat JSON', () => {
  const diff = getDiff(
    createFixturesPath('json/file_flat1.json'),
    createFixturesPath('json/file_flat2.json'),
  );

  expect(diff).toBe(`{
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff  JSON', () => {
  const diff = getDiff(createFixturesPath('json/file1.json'), createFixturesPath('json/file2.json'));

  expect(diff).toBe(`{
    follow: {
        k1: v1
      - k2: v2
      + k2: v2_2
    }
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff deep JSON', () => {
  const diff = getDiff(
    createFixturesPath('json/file_deep1.json'),
    createFixturesPath('json/file_deep2.json'),
  );

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
