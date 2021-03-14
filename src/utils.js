import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const createFixturesFilePath = (fixturesFilePath) => {
  const filepath = path.resolve(process.cwd(), '__tests__', '__fixtures__', fixturesFilePath);
  return filepath;
};
