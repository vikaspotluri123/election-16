const chalk = require('chalk');
module.exports = function (err) {
	// assertion error
	if(err.message.indexOf(': expected') >= 0) {
		err = err.message.split(': expected')[0];
		console.log(chalk.red(err + '; exiting...'));
	} else {
		console.error(err);
	}
}