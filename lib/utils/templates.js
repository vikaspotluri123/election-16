/*
* @type: function
* @name: popData
* @description: generates a relative path to the population data.
*/
function popData (year) {
	 return `./${year}/population-data/PEP_${year}_PEPANNRES.csv`;
}

/*
* @type: function
* @name: popMeta
* @description: generates a relative path to the population data meta file.
*/
function popMeta (year) {
	return `./${year}/population-data/PEP_${year}_PEPANNRES_metadata.csv`;
}

/*
* @type: function
* @name: popMeta
* @description: generates a relative path to the population data meta file.
*/
function voteData (year) {
	return `./${year}/election-data/county_level.csv`;
}

module.exports = {
	popData: popData,
	popMeta: popMeta,
	voteData: voteData
}