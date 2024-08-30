import gendiff from '../src/index.js';
import resultJSON from '../__fixtures__/resultJSON.js';
import resultStylish from '../__fixtures__/resultStylish.js';
import resultPlain from '../__fixtures__/resultPlain.js'
import path from 'node:path';


const formatList = [
  'json',
  'yaml',
  'yml'
];

const resolveFilePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

describe('comparing 2 files', () => {
  test.each(formatList) ('gendiff', (format) => {
    const filepath1 = resolveFilePath(`file1.${format}`);
    const filepath2 = resolveFilePath(`file2.${format}`);

    expect(gendiff(filepath1, filepath2)).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toMatch(resultPlain);
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
  })

});
