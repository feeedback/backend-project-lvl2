import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/prefer-default-export
export const createFixturesFilePath = (testFilepath, fixturesFilePath) => {
  const __filename = fileURLToPath(testFilepath);
  const __dirname = path.dirname(__filename);
  const filepath = path.resolve(__dirname, '__fixtures__', fixturesFilePath);
  return filepath;
};
