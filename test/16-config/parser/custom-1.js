var Parser = require('../../_utils/requireUncached')(__dirname + '/../../../parser');

// change parser order
Parser.setFilesOrder('yaml', 0);
Parser.setFilesOrder('yml', 1);

Parser.setParser('custom', function(filename, content) {
  return content.split(/\n/g).reduce(function(res, line) {
    var matches = line.match(/([a-z_\-]+)\s*:\s*(.*)\s*$/i);
    if (matches) {
      matches[1].split(/-/g).reduce(function(obj, key, index, keys) {
        if (index === keys.length -1) {
          obj[key] = matches[2];
        }
        return obj[key] || (obj[key] = {});
      }, res);
    }
    return res;
  }, {});
});

module.exports = Parser;
