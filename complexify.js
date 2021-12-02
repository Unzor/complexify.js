#!/usr/bin/env node
var uglify = require('uglify-js');
var argOutPos = process.argv.indexOf('-o') + 1 | process.argv.indexOf('--output') + 1;
var fName = process.argv.indexOf('-o') + 2 | process.argv.indexOf('--output') + 1;
var fs = require('fs');
var encoded = new TextEncoder().encode(fs.readFileSync(process.argv[fName]));
var ets = encoded.toString().split(',');
var new_file = uglify.minify(`((wrapper) => {wrapper.eval(new TextDecoder().decode(Uint8Array.from([${ets}])))})(global);`).code;
fs.writeFileSync(process.argv[argOutPos], new_file);
