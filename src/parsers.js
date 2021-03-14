import yamlParser from 'js-yaml';

const getParsedData = (fileFormat, fileData) => {
  const mapFileFormatToParseFn = {
    json: (data) => JSON.parse(data),
    yml: (data) => yamlParser.load(data),
  };

  return mapFileFormatToParseFn[fileFormat](fileData);
};

export default getParsedData;
