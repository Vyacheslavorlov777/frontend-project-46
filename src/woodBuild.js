import _ from 'lodash';
import formatter from './formatters/formatter.js';

const dat1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};

const dat2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

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
			}
		}
		if (!_.has(data2, key)) {
			return {
				type: 'dntHave2',
				key,
				value: data1[key],
			}
		}
		if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
			return {
				type: 'nested',
				key,
				children: buildKye(data1[key], data2[key]),
			}
		}
		if (_.isEqual(data1[key], data2[key])) {
			return {
				type: 'identical',
				key,
				value: data1[key],
			}
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

const getTreeDif = (data1, data2) => {
	return {
		type: 'root',
		children: buildKye(data1, data2)
	};
};

// console.log(JSON.stringify(getTreeDif(dat1, dat2), null, 2));


export default getTreeDif;

