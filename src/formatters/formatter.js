import buildTreeStylish from "./stylish.js";
import makePlain from "./plain.js";


const formatter = {
    json: JSON.stringify,
    stylish: buildTreeStylish,
    plain: makePlain,
};

export default (tree, format) => formatter[format](tree);