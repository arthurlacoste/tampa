const nargs = /\{\{([0-9a-zA-Z_.]+)\}\}/g;


function tampax(string) {
	let args;

	if (arguments.length === 2 && typeof arguments[1] === 'object') {
		args = arguments[1];
	} else {
		args = new Array(arguments.length - 1);
		for (let i = 1; i < arguments.length; ++i) {
			args[i - 1] = arguments[i];
		}
	}

	if (!args || !args.hasOwnProperty) {
		args = {};
	}

	return string.replace(nargs, (match, i, index) => {
		let result;

    // Test for triple curly bracket to escape it
		if (string[index - 1] === '{' &&
            string[index + match.length] === '}') {
			return '{'+i+'}';
		}
		result = args.hasOwnProperty(i) ? args[i] : null;
		if (result === null || result === undefined) {
			return '';
		}
		return result;
	});
}

module.exports = tampax;
