const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const templates = require('./utils/templates');

function process(data) {
	// The data that will be returned
	const payload = {};

	// this is the column name row which we don't need
	data.shift();

	data.forEach((datum) => {

		// This is a constant - the third row is the {county_name} county, {state}
		//	splitting it by the comma will give you the county [0] and stat [1]
		const location = datum[2].split(',');

		const state = location[1].trim();
		const county = location[0].replace(/county/g,'').trim();
		const population = datum[this.popIndex];

		if(!payload[state]) {
			payload[state] = [];
		}

		payload[state].push({name:county, population: population});
	});

	return payload;
}

module.exports = function (year, popIndex) {
	// year and popIndex must be valid
	if(!year || (!popIndex || popIndex < 0))
		throw new Error('Expected year & popIndex');
	// Do _not_ catch any error - pass it on
	const popData = fs.readFileSync(templates.popData(year));
	const rawData = parse(popData);
	return process(rawData);
}