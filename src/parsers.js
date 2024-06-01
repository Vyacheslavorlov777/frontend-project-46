import jsYaml from 'js-yaml';

const pars = {
  json: JSON.parse,
  yaml: jsYaml.load,
  yml: jsYaml.load,
};

export default (data, format) => pars[format](data);
