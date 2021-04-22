# UniteScript
> ## *Redefining the right tool for the right job*

UniteScript is currently just a proof of concept, but through the power of Web Assembly and Emscripten, this small proof concept can run JavaScript, C++, and C all in the same language.

## Take a look at [example.us](./proof-of-concept/example.us)
As you might have been able to tell, the concept is to run functions in different languages and use them interchangeably.

All C and C++ functions are bundled into WASM and JavaScript files then called on by the functions that were transpiled into the main JavaScript file.

## Want to give it a try?
First install Emscripten (info on how to install <a href="https://emscripten.org/docs/getting_started/downloads.html#installation-using-unofficial-packages">here</a>)

Then install the NPM package
` npm install unitescript -g # or yarn global add unitescript `

Run `usc` against your UniteScript file like so
` usc file-name `
