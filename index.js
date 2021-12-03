#!/usr/bin/env node

function to_r(text) {
    var r = "";
    var n;
    var t;
    var b = ["___", "__$", "_$_", "_$$", "$__", "$_$", "$$_", "$$$", "$___", "$__$", "$_$_", "$_$$", "$$__", "$$_$", "$$$_", "$$$$", ];
    var s = "";
    for (var i = 0; i < text.length; i++) {
        n = text.charCodeAt(i);
        if (n == 0x22 || n == 0x5c) {
            s += "\\\\\\" + text.charAt(i).toString(16);
        } else if ((0x21 <= n && n <= 0x2f) || (0x3A <= n && n <= 0x40) || (0x5b <= n && n <= 0x60) || (0x7b <= n && n <= 0x7f)) {
            //}else if( (0x20 <= n && n <= 0x2f) || (0x3A <= n == 0x40) || ( 0x5b <= n && n <= 0x60 ) || ( 0x7b <= n && n <= 0x7f ) ){
            s += text.charAt(i);
        } else if ((0x30 <= n && n <= 0x39) || (0x61 <= n && n <= 0x66)) {
            if (s) r += "\"" + s + "\"+";
            r += "$" + "." + b[n < 0x40 ? n - 0x30 : n - 0x57] + "+";
            s = "";
        } else if (n == 0x6c) { // 'l'
            if (s) r += "\"" + s + "\"+";
            r += "(![]+\"\")[" + "$" + "._$_]+";
            s = "";
        } else if (n == 0x6f) { // 'o'
            if (s) r += "\"" + s + "\"+";
            r += "$" + "._$+";
            s = "";
        } else if (n == 0x74) { // 'u'
            if (s) r += "\"" + s + "\"+";
            r += "$" + ".__+";
            s = "";
        } else if (n == 0x75) { // 'u'
            if (s) r += "\"" + s + "\"+";
            r += "$" + "._+";
            s = "";
        } else if (n < 128) {
            if (s) r += "\"" + s;
            else r += "\"";
            r += "\\\\\"+" + n.toString(8).replace(/[0-7]/g, function(c) {
                return "$" + "." + b[c] + "+"
            });
            s = "";
        } else {
            if (s) r += "\"" + s;
            else r += "\"";
            r += "\\\\\"+" + "$" + "._+" + n.toString(16).replace(/[0-9a-f]/gi, function(c) {
                return "$" + "." + b[parseInt(c, 16)] + "+"
            });
            s = "";
        }
    }
    if (s) r += "\"" + s + "\"+";

    r =
        "$" + "=~[];" +
        "$" + "={___:++" + "$" + ",$$$$:(![]+\"\")[" + "$" + "],__$:++" + "$" + ",$_$_:(![]+\"\")[" + "$" + "],_$_:++" +
        "$" + ",$_$$:({}+\"\")[" + "$" + "],$$_$:(" + "$" + "[" + "$" + "]+\"\")[" + "$" + "],_$$:++" + "$" + ",$$$_:(!\"\"+\"\")[" +
        "$" + "],$__:++" + "$" + ",$_$:++" + "$" + ",$$__:({}+\"\")[" + "$" + "],$$_:++" + "$" + ",$$$:++" + "$" + ",$___:++" + "$" + ",$__$:++" + "$" + "};" +
        "$" + ".$_=" +
        "(" + "$" + ".$_=" + "$" + "+\"\")[" + "$" + ".$_$]+" +
        "(" + "$" + "._$=" + "$" + ".$_[" + "$" + ".__$])+" +
        "(" + "$" + ".$$=(" + "$" + ".$+\"\")[" + "$" + ".__$])+" +
        "((!" + "$" + ")+\"\")[" + "$" + "._$$]+" +
        "(" + "$" + ".__=" + "$" + ".$_[" + "$" + ".$$_])+" +
        "(" + "$" + ".$=(!\"\"+\"\")[" + "$" + ".__$])+" +
        "(" + "$" + "._=(!\"\"+\"\")[" + "$" + "._$_])+" +
        "$" + ".$_[" + "$" + ".$_$]+" +
        "$" + ".__+" +
        "$" + "._$+" +
        "$" + ".$;" +
        "$" + ".$$=" +
        "$" + ".$+" +
        "(!\"\"+\"\")[" + "$" + "._$$]+" +
        "$" + ".__+" +
        "$" + "._+" +
        "$" + ".$+" +
        "$" + ".$$;" +
        "$" + ".$=(" + "$" + ".___)[" + "$" + ".$_][" + "$" + ".$_];" +
        "$" + ".$(" + "$" + ".$(" + "$" + ".$$+\"\\\"\"+" + r + "\"\\\"\")())();";

    return r;
}

var JavaScriptObfuscator = require('javascript-obfuscator');
var uglify = require('uglify-js');
var argOutPos = process.argv.indexOf('-o') + 1 | process.argv.indexOf('--output') + 1;
var fName = process.argv.indexOf('-o') + 2 | process.argv.indexOf('--output') + 1;
var fs = require('fs');
var encoded = new TextEncoder().encode(fs.readFileSync(process.argv[fName]));
var ets = encoded.toString().split(',');
var new_file = uglify.minify(`eval(new TextDecoder().decode(Uint8Array.from([${ets}])))`).code;
fs.writeFileSync(process.argv[argOutPos], uglify.minify(`var cdecs = [\`` + to_r(JavaScriptObfuscator.obfuscate(
    new_file, {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }
).getObfuscatedCode()).split('').join('`, `').replace(/\\/g, '\\\\') + `\`];

function _0x503d(_0x23a8eb, _0x126b1e) {
    var _0x1be81f = _0x1be8();
    return _0x503d = function(_0x503ddd, _0x59a981) {
        _0x503ddd = _0x503ddd - 0x113;
        var _0x6126cf = _0x1be81f[_0x503ddd];
        return _0x6126cf;
    }, _0x503d(_0x23a8eb, _0x126b1e);
}
var _0x1a2483 = _0x503d;

function _0x1be8() {
    var _0x5a6f40 = ['79pylFLX', 'join', '5048418FmydOs', '8852KVSFSH', '13160yyLqPq', '27046xKYewU', '258990jvkqDM', '3496bbCrml', '10397040YOpYbb', '774NQzxQC', '2642035AbLPbm'];
    _0x1be8 = function() {
        return _0x5a6f40;
    };
    return _0x1be8();
}(function(_0xdf3553, _0xed7ca8) {
    var _0x2e0309 = _0x503d,
        _0x5737d2 = _0xdf3553();
    while (!![]) {
        try {
            var _0xdeeadd = parseInt(_0x2e0309(0x118)) / 0x1 * (parseInt(_0x2e0309(0x11d)) / 0x2) + parseInt(_0x2e0309(0x11a)) / 0x3 + -parseInt(_0x2e0309(0x11b)) / 0x4 + -parseInt(_0x2e0309(0x117)) / 0x5 + parseInt(_0x2e0309(0x115)) / 0x6 + parseInt(_0x2e0309(0x11c)) / 0x7 * (-parseInt(_0x2e0309(0x114)) / 0x8) + parseInt(_0x2e0309(0x116)) / 0x9 * (-parseInt(_0x2e0309(0x113)) / 0xa);
            if (_0xdeeadd === _0xed7ca8) break;
            else _0x5737d2['push'](_0x5737d2['shift']());
        } catch (_0xcc6161) {
            _0x5737d2['push'](_0x5737d2['shift']());
        }
    }
}(_0x1be8, 0xdcd15), eval(cdecs[_0x1a2483(0x119)]('')));`).code);