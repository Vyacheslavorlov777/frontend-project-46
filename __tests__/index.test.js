import gendiff from '../src/index.js';
import result from '../__fixtures__/result_on_test.js';

test('comparing 2 json files', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
});

test('comparing 2 yaml files', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(result);
});

test('comparing 2 yml files', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(result);
});

// const formatList = [
//   'json',
//   'yaml',
//   'yml'
// ];

// const resolveFilePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

// test('comparing 2 files', () => {
//   test.each(formatList) ('gendiff $', (format) => {
//     const filepath1 = resolveFilePath(`file1.${format}`);
//     const filepath2 = resolveFilePath(`file2.${format}`);

//     expect(gendiff(filepath1, filepath2)).toEqual(result);
//   })

// });
