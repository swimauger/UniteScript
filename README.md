# UniteScript
> ## *Redefining the right tool for the right job*

UniteScript is currently just a proof of concept, but through the power of Web Assembly and Emscripten, this small proof concept can run JavaScript, C++, and C all in the same language.

## Take a look at [example.us](https://github.com/swimauger/UniteScript/blob/main/proof-of-concept/example.us)
As you might have been able to tell, the concept is to run functions in different languages and use them interchangeably.

All C and C++ functions are bundled into WASM and JavaScript files then called on by the functions that were transpiled into the main JavaScript file.

## Want to give it a try?
First install Emscripten (info on how to install [here](https://emscripten.org/docs/getting_started/downloads.html#installation-using-unofficial-packages))

Then install the NPM package
` npm install unitescript -g # or yarn global add unitescript `

Run `usc <unitescript-file>` OR `usc` to compile every UniteScript file recursively in the working directory

## Writing in UniteScript
UniteScript is closely integrated with JavaScript and as such anything outside of a function is treated as JavaScript

In order to create a function in another language like C or C++, write your function or class method like so:
```Java
function example(): c<void> {
  printf("It's that simple!");
}

// Or

class Test {
  example(): c++<void> {
    std::cout << "It's this simple" << std::endl;
  }
}
```

### Until a vscode extension is released, the best syntax highlighting in vscode is probably Java
![](https://raw.githubusercontent.com/swimauger/UniteScript/main/docs/syntax-highlighting.gif)
