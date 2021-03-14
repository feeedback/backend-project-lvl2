import { test, expect } from '@jest/globals';
import { createFixturesPath } from '../src/utils.js';
import getDiff from '../src/get_diff_two_files.js';

const expected = `Property 'common.follow' was added with value: false
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

test('gendiff deep JSON', () => {
  const diff = getDiff(
    createFixturesPath('json/file_deep1.json'),
    createFixturesPath('json/file_deep2.json'),
    'plain',
  );

  expect(diff).toBe(expected);
});

test('gendiff deep YAML', () => {
  const diff = getDiff(
    createFixturesPath('yaml/file_deep1.yml'),
    createFixturesPath('yaml/file_deep2.yml'),
    'plain',
  );

  expect(diff).toBe(expected);
});
