/* eslint no-prototype-builtins: 0 */
const fs = require('fs');
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

	args = flatten(args);

	return string.replace(nargs, (match, i, index) => {
    // Test for triple curly bracket to escape it
		if (string[index - 1] === '{' &&
            string[index + match.length] === '}') {
			return '{' + i + '}';
		}
		const result = args.hasOwnProperty(i) ? args[i] : null;
		if (result === null || result === undefined) {
      // Keep tag if no var found
			return '{{' + i + '}}';
		}
		return result;
	});
}

function resolveArgs(args) {
	const resolved = {};
	const resolving = {};

	function resolve(key) {
		if (resolved.hasOwnProperty(key)) return resolved[key];
		if (!args.hasOwnProperty(key) || resolving[key]) return undefined;

		const value = args[key];
		if (typeof value !== 'string') {
			resolved[key] = value;
			return value;
		}

		resolving[key] = true;
		const dependencies = {};
		value.replace(nargs, (match, dependency) => {
			const dependencyValue = resolve(dependency);
			if (dependencyValue !== undefined && dependencyValue !== null) {
				dependencies[dependency] = dependencyValue;
			}
			return match;
		});
		delete resolving[key];

		resolved[key] = tampax(value, dependencies);
		return resolved[key];
	}

	Object.keys(args).forEach(resolve);
	return Object.assign({}, args, resolved);
}

function readYamlString(string, options, cb) {
	if (typeof options === 'function') {
		cb = options;
		options = {};
	}

	try {
		const data = yaml.safeLoad(string, options);
		cb(null, data);
	} catch (err) {
		return cb(err.stack || String(err));
	}
}

function yamlParseString(ymlString, args, opts, cb) {
	if (typeof args === 'function') {
		cb = args;
		args = {};
		opts = {};
	} else if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}
	if (args == null) args = {};

	readYamlString(ymlString, (err, data) => {
		if (err) {
			return cb(err);
		}
		const flattenString = flatten(data);
		args = Object.assign(flatten(args), flattenString);
		const resolvedArgs = resolveArgs(args);
		const formatted = tampax(ymlString, resolvedArgs);

		readYamlString(formatted, (err, data) => {
			if (err) {
				return cb(err);
			}
			return cb(null, data);
		});
	});
}

function yamlParseFile(ymlFile, args, opts, cb) {
	fs.readFile(ymlFile, 'utf8', (err, data) => {
		if (err) {
			return cb(err);
		}
		yamlParseString(data, args, opts, cb);
	});
}

function objectParseString(objectString, args) {
	const dump = yaml.safeDump(objectString);
	return (yamlParseString(dump, args));
}

module.exports = tampax;
module.exports.yamlParseString = yamlParseString;
module.exports.yamlParseFile = yamlParseFile;
module.exports.objectParseString = objectParseString;
module.exports.readYamlString = readYamlString;
