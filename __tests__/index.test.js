import gendiff from '../src/index.js';
import resultJSON from '../__fixtures__/resultJSON.js';
import resultStylish from '../__fixtures__/resultStylish.js';
import path from 'node:path';


// test('comparing 2 json files', () => {
//   expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
// });

// test('comparing 2 yaml files', () => {
//   expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(result);
// });

// test('comparing 2 yml files', () => {
//   expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(result);
// });

const formatList = [
  'json',
  'yaml',
  'yml'
];

const resolveFilePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

describe('comparing 2 files', () => {
  test.each(formatList) ('gendiff $', (format) => {
    const filepath1 = resolveFilePath(`file1.${format}`);
    const filepath2 = resolveFilePath(`file2.${format}`);

    expect(gendiff(filepath1, filepath2)).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
    // expect(gendiff(filepath1, filepath2, 'plain')).toEqual(resultStylish);
  })

});
