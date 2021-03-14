import { test, expect } from '@jest/globals';
import path from 'path';
import getDiff from '../src/get_diff_two_files.js';

test('gendiff flat JSON', () => {
  expect(
    getDiff(
      path.resolve(process.cwd(), '__tests__', '__fixtures__/json/file1.json'),
      path.resolve(process.cwd(), '__tests__', '__fixtures__/json/file2.json'),
    ),
  ).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
