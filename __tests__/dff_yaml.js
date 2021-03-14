import { test, expect } from '@jest/globals';
import path from 'path';
import getDiff from '../src/get_diff_two_files.js';

test('gendiff flat YAML', () => {
  expect(
    getDiff(
      path.resolve(process.cwd(), '__tests__', '__fixtures__/yaml/file1.yml'),
      path.resolve(process.cwd(), '__tests__', '__fixtures__/yaml/file2.yml'),
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
