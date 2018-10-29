'use strict';

const {promisify} = require('util');
const {writeFile, readFile} = require('fs');

const read = promisify(readFile);
const write = promisify(writeFile);

module.exports = async function writeTemplate(data) {
    let template = await read('./template.html', 'utf8');
    template = template.replace('{ELECTION_DATA}', JSON.stringify(data));
/*     template = template.replace(/    /g, '');
    template = template.replace(/\n/g, ''); */

    return await write('./gh-pages/index.html', template);
};

module.exports.dataOnly = async function writeData(data) {
	let output = 'name, republican voters, democratic voters, total voters, population, turnout\n';
	let index;

	for (index in data) {
		let {name, r, d, t, population, turnout} = data[index];
		output += `"${name}","${r}","${d}","${t}","${population}","${turnout}"\n`;
	}

	return write('./gh-pages/data.csv', output);
}

module.exports.rdPop = async function rdPop(data, includeIndex = false) {
	let output = 'RD Ratio, population\n';
	let index;

	for (index in data) {
		let {rd, population} = data[index];
		output += `${rd},${population}\n`;
	}

	await write('./gh-pages/data.csv', output);
	output = null;

	if (includeIndex) {
		return await module.exports(data);
	}
}