// @todo: finish implementing

const assert = require('chai').assert;
const censusParser = require('./lib/census-parser');
const electionParser = require('./lib/election-parser');
const verifyData = require('./lib/utils/comparinator');
const mergeData = require('./lib/utils/merger');
const flattenData = require('./lib/flatten-data');
const loadMeta = require('./lib/meta');
const write = require('./lib/write');
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
const popData = censusParser(year, popIndex);
assert.ok(popData, 'Failed parsing census data');

console.log('Parsing election data');
const voteData = electionParser(year);
assert.ok(voteData, 'Failed parsing election data');

console.log('Verifying integrity');
assert.ok(verifyData({voteData},{popData}), 'Failed verification');
console.log('Data seems valid');

console.log('Merging data together');
dataOut = mergeData(popData, voteData);
assert.ok(dataOut, 'Unable to merge data');

console.log('Flattening data');
dataOut = flattenData(dataOut);

console.log('writing data to file');
write.dataOnly(dataOut, true);