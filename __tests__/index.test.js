import genDiff from '../src/index.js';
import result from '../__fixtures__/result_on_test.js';

test('comparing 2 flat json files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
});
