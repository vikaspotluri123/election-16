module.exports = function(keyA, keyB) {
	const keyAName = Object.keys(keyA)[0];
	const keyBName = Object.keys(keyB)[0];

	let keysMatch = true;

	keyA = keyA[keyAName];
	keyB = keyB[keyBName];

	for(state in keyA) {
		for(county in keyA[state]) {
			if (!keyB[state][county]) {
				console.log(`${keyBName} data doesn\'t contain ${county} (${state})`);
				keysMatch = false;
			}
		}
	}

	for(state in keyB) {
		for (county in keyB[state]) {
			if(!keyA[state][county]){
				console.log(`${keyAName} data doesn\'t contain ${county} (${state})`);
				keysMatch = false;
			}
		}
	}

	return keysMatch;
}