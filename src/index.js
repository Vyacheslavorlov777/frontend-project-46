import path from 'node:path';
import { readFileSync } from 'node:fs';
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

  return formatter(getTreeDif(data1, data2), format);
};

export default gendiff;
