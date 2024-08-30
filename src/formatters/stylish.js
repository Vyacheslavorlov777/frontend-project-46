import _ from "lodash";

const spase = ' ';
const spaseDef = 4;
const quantitySpase = (depth) => spase.repeat(depth * spaseDef - 2);
const spaseBrace = (depth) => spase.repeat(depth * spaseDef - spaseDef);


const join = (string, depth) => [
    '{',
    ...string,
    `${spaseBrace(depth)}}`,
].join('\n');

const reading = (data, depth) => {
    if (!_.isObject(data) || data === null) {
        return String(data);
    };
    const keys = _.keys(data)
    const string = keys.map((key) => `${quantitySpase(depth)} ${key}: ${reading(data[key], depth + 1)}`);
    return join(string, depth);
}

const buildTreeStylish = (tree) => {
    const iter = (node, depth) => {
        switch (node.type) {
            case 'root': {
                const result = node.children.flatMap((child) => iter(child, depth));
                return join(result, depth);
            }
            case 'nested': {
                const depthPride = node.children.flatMap((child) => iter(child, depth + 1));
                return `${quantitySpase(depth)}  ${node.key}: ${join(depthPride, depth + 1)}`;
            }
            case 'dntHave1': {
                return `${quantitySpase(depth)}+ ${node.key}: ${reading(node.value, depth + 1)}`;
            }
            case 'dntHave2': {
                return `${quantitySpase(depth)}- ${node.key}: ${reading(node.value, depth + 1)}`;
            }
            case 'identical': {
                return `${quantitySpase(depth)}  ${node.key}: ${reading(node.value, depth + 1)}`;
            }
            case 'various': {
                return [`${quantitySpase(depth)}-  ${node.key}: ${reading(node.oldValue, depth + 1)}`,
                    `${quantitySpase(depth)}+ ${node.key}: ${reading(node.newValue, depth + 1)}`];
            }
            default:{
                throw Error('Uncorrect')
            };
        };
    };
    return iter(tree, 1);
};

export default buildTreeStylish;