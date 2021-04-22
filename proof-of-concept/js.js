const hash = require('./hash');

class JsBundle {
  constructor(fileName) {
    this.head = `const __c = require('./${fileName}.c.js')\n__c.onRuntimeInitialized = function() {\n`;
    this.lines = [];
    this.foot = '\n}';
  }

  stream(line) {
    if (/: js</g.test(line)) {
      const returnType = /<.*>/.exec(line)[0].replace(/<|>/g, '');
      this.lines.push(line.replace(`: js<${returnType}>`, ''));
    } else {
      this.lines.push(line);
    }
  }

  bundle() {
    return `${this.head}${this.lines.join('\n')}${this.foot}`;
  }
}

module.exports = JsBundle;