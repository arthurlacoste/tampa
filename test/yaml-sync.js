const test = require('ava');
const format = require('../index.js');

test('yamlParseStringSync returns parsed YAML immediately', t => {
	const data = format.yamlParseStringSync(`
dude: Arthur
weapon: Excalibur
sentence: "{{dude}} uses {{weapon}}."`);

	t.is(data.sentence, 'Arthur uses Excalibur.');
});

test('yamlParseStringSync accepts nested arguments', t => {
	const data = format.yamlParseStringSync(
		'sentence: "Hello {{person.name}}"',
		{person: {name: 'Arthur'}}
	);

	t.is(data.sentence, 'Hello Arthur');
});

test('yamlParseStringSync resolves chained YAML references', t => {
	const data = format.yamlParseStringSync(`
global:
  proj: utils
  file: hello {{global.proj}}
foo:
  - echo {{global.file}}`);

	t.is(data.global.file, 'hello utils');
	t.is(data.foo[0], 'echo hello utils');
});

test('yamlParseStringSync throws YAML parsing errors synchronously', t => {
	t.throws(() => format.yamlParseStringSync('items:\n\t- invalid indentation'));
});
