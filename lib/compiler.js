const fs = require('fs');
const path = require('path');
const parser = require('./parser');

class Compiler {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;

    this.modules = [];
  }

  run() {
    const parsedEntry = this.buildModule(this.entry, path.dirname(this.entry), true);

    this.modules.push(parsedEntry);

    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      for (let dependency of module.dependencies) {
        this.modules.push(this.buildModule(dependency.filename, dependency.relativePath));
      }
    }

    console.log(this.modules);
  }

  buildModule(filename, relativePath, isEntry) {
    return parser.parseFile(filename, relativePath, isEntry);
  }

  emitFiles() {
    let modules = '';

    for (let module of this.modules) {
      modules += `'${module.filename}': function(module, exports, require) {
        ${module.code};
      },`;
    }

    const bundle = `(function() {
      var __webpack_modules__ = { ${modules} };
      
      function __webpack_require__(moduleId) {
        var module = { exports: {} };

        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        
        return module.exports;
      }
      
      var __webpack_exports__ = __webpack_require__('${this.entry}');
    })();`;

    // console.log(bundle);

    const outputPath = path.join(this.output.path, this.output.filename);
    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}

module.exports = Compiler;