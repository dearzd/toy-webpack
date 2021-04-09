const fs = require('fs');
const path = require('path');
const traverse = require("@babel/traverse").default;
const { parseSync, transformFromAstSync } = require('@babel/core')

const parser = {
  getAST(filePath) {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');

    return parseSync(sourceCode);
  },

  getDependencies(ast, relativePath) {
    let dependencies = [];

    traverse(ast, {
      ImportDeclaration: (path) => {
        dependencies.push({
          relativePath,
          filename: path.node.source.value
        });
      }
    });

    return dependencies;
  },

  transform(ast) {
    const { code } = transformFromAstSync(ast, null, {
      plugins: [
        ["@babel/plugin-transform-modules-commonjs", {
          "allowTopLevelThis": true
        }]
      ]
    });

    return code;
  },

  parseFile(filename, relativePath, isEntry) {
    const filePath = isEntry ? filename : path.resolve(process.cwd(), relativePath, filename);

    const ast = this.getAST(filePath);
    const dependencies = this.getDependencies(ast, path.dirname(filePath));
    const code = this.transform(ast);

    // console.log({ filename, dependencies, code });

    return {
      filename,
      dependencies,
      code
    };
  }
}

module.exports = parser;