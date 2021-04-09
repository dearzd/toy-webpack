const Compiler = require('./compiler.js');

const webpack = (options) => {
  const compiler = new Compiler(options);

  compiler.run();
  compiler.emitFiles();
};

module.exports = webpack;