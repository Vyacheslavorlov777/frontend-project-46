import _ from "lodash";

const formatValue = (value) => {
    switch (typeof value) {
        case 'object': {
            return !value ? null :'[complex value]';
        }
        case 'string': {
            return `'${value}'`;
        }
        default: {
            return `${value}`;
        }
    }
};

const getPath = (node) => node.flat().join('.');


const buildPlain = (tree) => {
    const iter = (node, path) => node.map((child) => {
        const curPath = getPath([path, child.key]);
        switch (child.type) {
            case 'nested': {
                return iter(child.children, curPath);
            }
            case 'dntHave1': {
                return `Property '${curPath}' was added with value: ${formatValue(child.value)}`;
            }
            case 'dntHave2': {
                return `Property '${curPath}' was removed`;
            }
            case 'various': {
                return `Property '${curPath}' was updated. From ${formatValue(child.oldValue)} to ${formatValue(child.newValue)}`;
            }
            case 'identical': {
                return null;
            }
            default: {
                throw Error('Uncorrect')
            }
        }
    });
    return iter(tree.children, []);
};


export default function makePlain(data) {
    const result = buildPlain(data);
    return _.flattenDeep(result).filter((el) => el).join('\n');
};