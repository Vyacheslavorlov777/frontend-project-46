import _ from 'lodash';

const buildKye = (data1, data2) => {
  const keysData1 = _.keys(data1);
  const keysData2 = _.keys(data2);
  const sortKyes = _.sortBy(_.union(keysData1, keysData2));

  const children = sortKyes.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'dntHave1',
        key,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'dntHave2',
        key,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildKye(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        type: 'identical',
        key,
        value: data1[key],
      };
    }
    return {
      type: 'various',
      key,
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
  return children;
};

const getTreeDif = (data1, data2) => ({
  type: 'root',
  children: buildKye(data1, data2),
});

export default getTreeDif;
