#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const CppBundle = require('./cpp');
const JsBundle = require('./js');

function compile(fileUS) {
  const fileName = path.basename(fileUS).split('.')[0];

  const dist = path.dirname(fileUS.replace(process.cwd(), path.resolve(process.cwd(), 'dist')));
  const file = fs.readFileSync(fileUS, { encoding: 'utf-8' });

  const js = new JsBundle(fileName);
  const cpp = new CppBundle();
  const cppFunctions = [];

  for (const line of file.split('\n')) {
    const [ newLine, functionName ] = cpp.stream(line);
    js.stream(newLine);
    if (functionName) cppFunctions.push(`_${functionName}`);
  }

  fs.mkdirSync(dist, { recursive: true });
  fs.writeFileSync(path.resolve(dist, `${fileName}.cpp`), cpp.bundle());
  execSync(`emcc ${path.resolve(dist, `${fileName}.cpp`)} -o ${path.resolve(dist, `${fileName}.c.js`)} -s EXPORTED_FUNCTIONS='${JSON.stringify(cppFunctions)}' -s EXPORTED_RUNTIME_METHODS='["ccall"]'`);
  fs.writeFileSync(path.resolve(dist, `${fileName}.js`), js.bundle());
}

function compileAll(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      compileAll(filePath);
    } else if (file.endsWith('us')) {
      compile(filePath);
    }
  }
}

(async () => {
  if (process.argv[2]) {
    compile(path.resolve(process.cwd(), process.argv[2]));
  } else {
    compileAll(path.resolve(process.cwd()));
  }
})();
