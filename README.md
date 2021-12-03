# complexify.js
A Node.js tool to compress all your code into a single line of unreadable code, made with uglify.js and javascript-obfuscator.

# How is this different from javascript-obfuscator?
Instead of only obfuscation, it will go through steps of encoding/decoding:
- Encoding the given file into a Uint8Array
- Creating a file that can decode the Uint8Array
- Obfuscating the file
- Encoding it with JJEncode
- Splitting the file into different characters
- Minifying the file using uglify.js

##  Decoding
- Joining the characters
- Evaluating the joined code

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
