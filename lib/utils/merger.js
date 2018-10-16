module.exports = function(dataA, dataB) {

	for(state in dataA) {
		for (county in dataA[state]) {
			dataB[state][county].population = dataA[state][county].population;
		}
	}

	return dataB;
}