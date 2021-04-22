#!/usr/bin/env node

const { execSync } = require('child_process');
const fsp = require('fs/promises');
const path = require('path');
const CppBundle = require('./cpp');
const JsBundle = require('./js');

(async () => {
  const fileUS = path.resolve(process.cwd(), process.argv[2]);
  const fileName = path.basename(fileUS).split('.')[0];
  
  const dist = path.resolve(process.cwd(), 'dist');
  const file = await fsp.readFile(`./${fileName}.us`, { encoding: 'utf-8' });

  const js = new JsBundle(fileName);
  const cpp = new CppBundle();
  const cppFunctions = [];

  for (const line of file.split('\n')) {
    const [ newLine, functionName ] = cpp.stream(line);
    js.stream(newLine);
    if (functionName) cppFunctions.push(`_${functionName}`);
  }

  await fsp.mkdir(dist, { recursive: true });
  await fsp.writeFile(path.resolve(dist, `${fileName}.cpp`), cpp.bundle());
  execSync(`emcc ${path.resolve(dist, `${fileName}.cpp`)} -o ${path.resolve(dist, `${fileName}.c.js`)} -s EXPORTED_FUNCTIONS='${JSON.stringify(cppFunctions)}' -s EXPORTED_RUNTIME_METHODS='["ccall"]'`);
  await fsp.writeFile(path.resolve(dist, `${fileName}.js`), js.bundle());
})();
