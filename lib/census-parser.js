const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const clean = require('remove-accents')
const utils = require('./utils');
const templates = utils.templates;
const overrides = require('./overrides');

function processIncludingStates(data, popIndex) {
	// The data that will be returned
	const payload = {};

	// this is the column name row which we don't need
	data.shift();

	data.forEach((datum) => {

		// This is a constant - the third row is the {county_name} county, {state}
		//	splitting it by the comma will give you the county [0] and state [1]
		const location = datum[2].split(',');

		let state = clean(location[1].trim());
		if(utils.isAlaska(state)) return;
		state = utils.translateState(state);
		let county = clean(location[0]).replace(/county/ig,'').trim();
		const population = +datum[popIndex];

		if(!payload[state]) {
			payload[state] = {};
		}

		// Skipping these counties because they're tiny AND I couldn't find voter data for them
		if(overrides.skip.includes(county)) {
			return;
		}

		// These overrides account for changes in counties. If the county wasn't already created,
		if(overrides[county] && !payload[county.toLowerCase()]) {
			county = overrides[county];
			payload[state][county.toLowerCase()] = {name:county, population: population};
		}
		// case: the county has been created from the previous case
		else if(overrides[county] && payload[state][county.toLowerCase()])
			payload[state][county.toLowerCase()].population += population;
		// Defualt case
		else
			payload[state][county.toLowerCase()] = {name:county, population: population};

	});

	return payload;
}

function process(data, popIndex) {
	// The data that will be returned
	const payload = {};

	// this is the column name row which we don't need
	data.shift();

	data.forEach((datum) => {

		// This is a constant - the third row is the {county_name} county, {state}
		//	splitting it by the comma will give you the county [0] and stat [1]
		const location = datum[2].split(',');

		const state = location[1].trim();

		if(utils.isAlaska(state)) return;
		let county = location[0].replace(/County/g,'').trim();
		const population = +datum[popIndex];

		// These overrides account for changes in counties. If the county wasn't already created,
		if(overrides[county] && !payload[county.toLowerCase()]) {
			county = overrides[county];
			payload[county.toLowerCase()] = {name:county, population: population, state: state};
		}
		// case: the county has been created from the previous case, or this is _not_ the same county
		else if(overrides[county] || payload[county.toLowerCase()])
			payload[county.toLowerCase()].population += population;
		// Defualt case
		else
			payload[county.toLowerCase()] = {name:county, population: population, state: state};
	});

	return payload;
}

module.exports = function (year, popIndex) {
	// year and popIndex must be valid
	if(!year || (!popIndex || popIndex < 0))
		throw new Error('Expected year & popIndex');
	// Do _not_ catch any error - pass it on
	const popData = fs.readFileSync(templates.popData(year), 'utf8');
	const rawData = parse(popData);
	return processIncludingStates(rawData, popIndex);
}