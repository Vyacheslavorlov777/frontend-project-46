import buildTreeStylish from "./stylish.js";


const formatter = {
    json: JSON.stringify,
    stylish: buildTreeStylish,
};

export default (tree, format) => formatter[format](tree);