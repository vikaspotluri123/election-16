// @todo: finish implementing

const assert = require('chai').assert;
const censusParser = require('./lib/census-parser');
const loadMeta = require('./lib/meta');

const errorHandler = require('./lib/error');

process.on('uncaughtException', errorHandler);

let year = '2016';
let dataOut;

// Parse meta and get year data index for parsing census
console.log('Reading meta');
const popIndex = loadMeta(year);
// @todo: apply assertions more & add more cases to errors (specifically fs)
assert.isAtLeast(popIndex, 0, `Unable to find population info for ${year} in meta`);

console.log('Parsing census data');
dataOut = censusParser(year, popIndex);

console.log('Parsing election data');
/* // @todo
const elecParser = new electionParser(year);

let electionData = electionParser.parse();*/