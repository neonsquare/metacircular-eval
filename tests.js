var evalString = require("./main").evalString;
var assert = require('assert');

assert(evalString("3+4") === 7);
assert(evalString("fn = x=>x+1; fn(5);") === 6);
assert(evalString("fn = x=>y=>x+y; fn(5)(3);") === 8);