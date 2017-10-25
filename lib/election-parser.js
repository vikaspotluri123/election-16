const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const clean = require('remove-accents');
const utils = require('./utils');
const templates = utils.templates;

function process(data) {
	// The data that will be returned
	const payload = {};

	// this is the column name row which we don't need
	data.shift();

	data.forEach((datum) => {

		// This is a constant - the second row is democrat, third row is republican,
		//	the ninth row is state, and county is 10
		let state = clean(datum[8]);
		if(utils.isAlaska(state)) return;
		state = utils.translateState(state);
		const county = clean(datum[9]).replace(/County|county/g,'').trim();
		const d_votes= +datum[1];
		const r_votes= +datum[2];

		if(!payload[state]) {
			payload[state] = {};
		}

		payload[state][county.toLowerCase()] = {name: county, r: r_votes, d: d_votes};
	});

	return payload;
}

module.exports = function (year) {
	// year and popIndex must be valid
	if(!year)
		throw new Error('Expected year');
	// Do _not_ catch any error - pass it on
	const voteData = fs.readFileSync(templates.voteData(year), 'utf8');
	const rawData = parse(voteData);
	return process(rawData);
}