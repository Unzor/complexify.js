# complexify.js
A Node.js tool to compress all your code into a somewhat-unreadable single line of code.

# Installation & Usage
First, install complexify.js with the NPM package:
```
npm install -g complexify.js
```
Now you can use complexify.js. To compress a file, run:
```
complexify -o output-file.js file-to-compress.js
```
file-to-compress.js:
```javascript
console.log('Hello World!');
```
The output file:
```javascript
global.eval((new TextDecoder).decode(Uint8Array.from([99,111,110,115,111,108,101,46,108,111,103,40,39,72,101,108,108,111,32,87,111,114,108,100,33,39,41,59])));
```
