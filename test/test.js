const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const parser = require('../lib/parser.js');


/*const file = fs.readFileSync(path.resolve(__dirname, '../src/index.js'));
const ast = acorn.parse(file, { sourceType: 'module', ecmaVersion: 'latest' });
console.log(ast);*/


// const ast = parser.getAST(path.resolve(__dirname, '../src/index.js'));

// console.log(ast);

// console.log(parser.getDependencies(ast, '../src/index.js'));

// console.log(parser.transform(ast));

/*
const filePath = path.resolve(__dirname, '../src/index.js');
console.log(parser.parseFile(filePath, null, true));*/

const webpack = require('../lib/webpack.js');
const config = require('../toy-webpack.config.js');

webpack(config);