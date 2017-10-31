/* eslint no-prototype-builtins: 0 */

const yaml = require('js-yaml');
const flatten = require('flat');

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
    // Test for triple curly bracket to escape it
		if (string[index - 1] === '{' &&
            string[index + match.length] === '}') {
			return '{' + i + '}';
		}
		const result = args.hasOwnProperty(i) ? args[i] : null;
		if (result === null || result === undefined) {
			return '';
		}
		return result;
	});
}

function yamlParseString(ymlString, args) {
	args = args || {};
	const oString = yaml.load(ymlString);
	const flattenString = flatten(oString);
  // Console.log(flattenString);
	Object.assign(args, flattenString);
	const firstFormat = tampax(ymlString, args);
	return (yaml.load(firstFormat));
}

// Function yamlParseFile()

module.exports = tampax;
module.exports.yamlParseString = yamlParseString;
