import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const pars = (file) => JSON.parse(file);

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = readFileSync(getPath(filepath1), 'utf-8');
  const pathFile2 = readFileSync(getPath(filepath2), 'utf-8');

  const data1 = pars(pathFile1);
  const data2 = pars(pathFile2);

  const firstObjKeys = Object.keys(data1);
  const secondObjKeys = Object.keys(data2);
  const sortObjKeys = _.union(firstObjKeys, secondObjKeys).sort();

  const result = sortObjKeys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc.push(`- ${key}: ${data1[key]}`);
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      acc.push(`+ ${key}: ${data2[key]}`);
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        acc.push(`${key}: ${data1[key]}`);
      } else {
        acc.push(`- ${key}: ${data1[key]}`);
        acc.push(`+ ${key}: ${data2[key]}`);
      }
    }
    return acc;
  }, []);
  console.log(`{\n ${result.join('\n')} \n}`);
  return `{\n ${result.join('\n')} \n}`;
};

export default genDiff;
