const fs = require('fs');

module.exports = function(year) {
	const filename = require('./utils/templates').popMeta(year);
	const colWanted = new RegExp(`population estimate.*${year}`,'i');

	let index = -1;

	// load the meta file and extract the important piece - the identifier value
	let meta = fs.readFileSync(filename, 'utf8');
		meta = meta.toString();
		meta = meta.split('\r\n');
		meta = meta.filter((item) => item.split(/,/)[1]);

	meta.forEach(function(col,idx) {
		if(colWanted.test(col)) {
			index = idx;
			return;
		}
	});

	return index;
}
