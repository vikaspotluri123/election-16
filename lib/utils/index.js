const templates = require('./templates');
const translateState = require('./state');

// The voting data for Alaska is weird, and Alaska accounts for the minimum electoral
//	votes, so until better data for Alaska can be found, it will be ignored
function isAlaska(compare) {
	return (translateState(compare) === 'AK');
}

module.exports = {
	templates,
	isAlaska,
	translateState
};