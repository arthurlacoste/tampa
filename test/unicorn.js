const test = require('ava');
const format = require('../index.js');

const result = format('Hello {{name}}, how are you?', {name: 'Mark'});
console.log(result);

test('Named arguments are replaced', t => {
	const result = format('Hello {{name}}, how are you?', {name: 'Mark'});
	t.is(result, 'Hello Mark, how are you?');
});

test('Named arguments at the start of strings are replaced',
    t => {
	const result = format('{{likes}} people have liked this', {
		likes: 123
	});

	t.is(result, '123 people have liked this');
});

test('Named arguments at the end of string are replaced',
    t => {
	const result = format('Please respond by {{date}}', {
		date: '01/01/2015'
	});

	t.is(result, 'Please respond by 01/01/2015');
});

test('Multiple named arguments are replaced', t => {
	const result = format('Hello {{name}}, you have {{emails}} new messages', {
		name: 'Anna',
		emails: 5
	});

	t.is(result, 'Hello Anna, you have 5 new messages');
});

test('Missing named arguments works', t => {
	const result = format('Hello{{name}}, how are you?', {});
	t.is(result, 'Hello{{name}}, how are you?');
});

test('Named arguments can be escaped', t => {
	const result = format('Hello {{{name}}}, how are you?', {name: 'Mark'});
	t.is(result, 'Hello {{name}}, how are you?');
});

test('Array arguments are replaced', t => {
	const result = format('Hello {{0}}, how are you?', ['Mark']);
	t.is(result, 'Hello Mark, how are you?');
});

test('Array arguments at the start of strings are replaced',
    t => {
	const result = format('{{0}} people have liked this', [123]);

	t.is(result, '123 people have liked this');
});

test('Array arguments at the end of string are replaced',
    t => {
	const result = format('Please respond by {{0}}', ['01/01/2015']);

	t.is(result, 'Please respond by 01/01/2015');
});

test('Multiple array arguments are replaced', t => {
	const result = format('Hello {{0}}, you have {{1}} new messages', [
		'Anna',
		5
	]);

	t.is(result, 'Hello Anna, you have 5 new messages');
});

test('Missing array arguments become works', t => {
	const result = format('Hello{{0}}, how are you?', []);
	t.is(result, 'Hello{{0}}, how are you?');
});

test('Array arguments can be escaped', t => {
	const result = format('Hello {{{0}}}, how are you?', ['Mark']);
	t.is(result, 'Hello {{0}}, how are you?');
});

test('Array keys are not accessible', t => {
	const result = format('Function{{splice}}', []);
	t.is(result, 'Function{{splice}}');
});

test('Listed arguments are replaced', t => {
	const result = format('Hello {{0}}, how are you?', 'Mark');
	t.is(result, 'Hello Mark, how are you?');
});

test('Listed arguments at the start of strings are replaced',
    t => {
	const result = format('{{0}} people have liked this', 123);

	t.is(result, '123 people have liked this');
});

test('Listed arguments at the end of string are replaced',
    t => {
	const result = format('Please respond by {{0}}', '01/01/2015');

	t.is(result, 'Please respond by 01/01/2015');
});

test('Multiple listed arguments are replaced', t => {
	const result = format('Hello {{0}}, you have {{1}} new messages',
        'Anna',
        5);

	t.is(result, 'Hello Anna, you have 5 new messages');
});

test('Missing listed arguments works.', t => {
	const result = format('Hello{{1}}, how are you?', 'no');
	t.is(result, 'Hello{{1}}, how are you?');
});

test('Listed arguments can be escaped', t => {
	const result = format('Hello {{{0}}}, how are you?', 'Mark');
	t.is(result, 'Hello {{0}}, how are you?');
});

test('Allow null data', t => {
	const result = format('Hello{{0}}', null);
	t.is(result, 'Hello{{0}}');
});

test('Allow undefined data', t => {
	const result1 = format('Hello{{0}}');
	const result2 = format('Hello{{0}}', undefined);
	t.is(result1, 'Hello{{0}}');
	t.is(result2, 'Hello{{0}}');
});

test('Null keys become 0 characters', t => {
	const result1 = format('Hello{{name}}', {name: null});
	const result2 = format('Hello{{0}}', [null]);
	const result3 = format('Hello{{0}}{{1}}{{2}}', null, null, null);
	t.is(result1, 'Hello{{name}}');
	t.is(result2, 'Hello{{0}}');
	t.is(result3, 'Hello{{0}}{{1}}{{2}}');
});

test('Undefined keys become 0 characters', t => {
	const result1 = format('Hello{{firstName}}{{lastName}}', {name: undefined});
	const result2 = format('Hello{{0}}{{1}}', [undefined]);
	const result3 = format('Hello{{0}}{{1}}{{2}}', undefined, undefined);
	t.is(result1, 'Hello{{firstName}}{{lastName}}');
	t.is(result2, 'Hello{{0}}{{1}}');
	t.is(result3, 'Hello{{0}}{{1}}{{2}}');
});

test('Works across multline strings', t => {
	const result1 = format('{{zero}}\n{{one}}\n{{two}}', {
		zero: 'A',
		one: 'B',
		two: 'C'
	});
	const result2 = format('{{0}}\n{{1}}\n{{2}}', ['A', 'B', 'C']);
	const result3 = format('{{0}}\n{{1}}\n{{2}}', 'A', 'B', 'C');
	t.is(result1, 'A\nB\nC');
	t.is(result2, 'A\nB\nC');
	t.is(result3, 'A\nB\nC');
});

test('Allow multiple references', t => {
	const result1 = format('{{a}}{{b}}{{c}}\n{{a}}{{b}}{{c}}\n{{a}}{{b}}{{c}}', {
		a: 'one',
		b: 'two',
		c: 'three'
	});
	const result2 = format('{{0}}{{1}}{{2}}\n{{0}}{{1}}{{2}}\n{{0}}{{1}}{{2}}', [
		'one',
		'two',
		'three'
	]);
	const result3 = format('{{0}}{{1}}{{2}}\n{{0}}{{1}}{{2}}\n{{0}}{{1}}{{2}}',
        'one',
        'two',
        'three');
	t.is(result1, 'onetwothree\nonetwothree\nonetwothree');
	t.is(result2, 'onetwothree\nonetwothree\nonetwothree');
	t.is(result3, 'onetwothree\nonetwothree\nonetwothree');
});

test('Template string without arguments', t => {
	const result = format('Hello, how are you?');
	t.is(result, 'Hello, how are you?');
});

test('Template string with underscores', t => {
	const result = format('Hello {{FULL_NAME}}, how are you?', {
		FULL_NAME: 'James Bond'
	});
	t.is(result, 'Hello James Bond, how are you?');
});

test('Template string with dot, flattened.', t => {
	const flatten = require('flat');
	const result = format('Hello {{FULL.NAME}}, how are you?', flatten({
		FULL: {NAME: 'James Bond'}
	}));
	t.is(result, 'Hello James Bond, how are you?');
});
test('Template string with underscores and dot.', t => {
	const result = format('Hello {{FULL_.NAME}}, how are you?', {
		'FULL_.NAME': 'James Bond'
	});
	t.is(result, 'Hello James Bond, how are you?');
});

test('Parse variable inside of YAML string.', t => {
	const result = format.yamlParseString(`
dude: Arthur
weapon: Excalibur
sentence: "{{dude}} use {{weapon}}. The goal is {{goal}}."
`, {
	goal: 'to kill Mordred'
});

	t.is(result.sentence, 'Arthur use Excalibur. The goal is to kill Mordred.');
});

test('YAML string, flattened required.', t => {
	const yamlString = `
dude:
  name: Arthur
weapon:
  favorite: Excalibur
  useless: knife
sentence: "{{dude.name}} use {{weapon.favorite}}. The goal is {{goal}}."`;

	const result = format.yamlParseString(yamlString, {goal: 'to kill Mordred'});

	t.is(result.sentence, 'Arthur use Excalibur. The goal is to kill Mordred.');
});

test('YAML string, args is optionnal, flattened required.', t => {
	const yamlString = `
dude:
  name: Arthur
weapon:
  favorite: Excalibur
  useless: knife
sentence: "{{dude.name}} use {{weapon.favorite}}."`;

	const result = format.yamlParseString(yamlString);

	t.is(result.sentence, 'Arthur use Excalibur.');
});
