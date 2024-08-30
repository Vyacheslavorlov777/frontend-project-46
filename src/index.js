import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import parser from './parsers.js';
import getTreeDif from './woodBuild.js';
import formatter from './formatters/formatter.js';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const getFormat = (filename) => path.extname(filename).slice(1);

const getData = (filePath) => parser(readFileSync(filePath, 'utf-8'), getFormat(filePath));

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const data1 = getData(path1);
  const data2 = getData(path2);



  // const firstObjKeys = _.keys(data1);
  // const secondObjKeys = _.keys(data2);
  // const sortObjKeys = _.union(firstObjKeys, secondObjKeys).sort();

  // const result = sortObjKeys.reduce((acc, key) => {
  //   if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
  //     acc.push(`  - ${key}: ${data1[key]}`);
  //   } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
  //     acc.push(`  + ${key}: ${data2[key]}`);
  //   } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
  //     if (data1[key] === data2[key]) {
  //       acc.push(`    ${key}: ${data1[key]}`);
  //     } else {
  //       acc.push(`  - ${key}: ${data1[key]}`);
  //       acc.push(`  + ${key}: ${data2[key]}`);
  //     }
  //   }
  //   return acc;
  // }, []);
  // return `{\n${result.join('\n')}\n}`;

  return formatter(getTreeDif(data1, data2), format);
};

export default gendiff;
