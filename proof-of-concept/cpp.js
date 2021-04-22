const hash = require('./hash');

class CppBundle {
  constructor() {
    this.head = '#include <iostream>\nextern "C" {\n';
    this.funcs = [];
    this.foot = '\n}';
    this.isStreamingC = false;
  }

  stream(line) {
    if (/: c</g.test(line) || /: c\+\+</g.test(line)) {
      const functionName = hash.next().value;
      const returnType = /<.*>/.exec(line)[0].replace(/<|>/g, '');
      this.funcs.unshift(`${returnType} ${functionName}() {`);
      this.isStreamingC = true;
      return [`${line.replace(`: c<${returnType}>`, '').replace(`: c++<${returnType}>`, '')}\n__c.ccall('${functionName}');\n`, functionName];
    } else if (this.isStreamingC) {
      this.funcs[0] += `\n${line}`;
      if (line.includes('}')) {
        this.isStreamingC = false;
        return [line];
      } else {
        return [''];
      }
    } else {
      return [line];
    }
  }

  bundle() {
    return `${this.head}${this.funcs.join('\n')}${this.foot}`;
  }
}

module.exports = CppBundle;