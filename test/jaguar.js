const tampax = require('../index.js');

const yamlString = `
dude:
  name: Arthur
weapon:
  favorite: Excalibur
  useless: knife
sentence: "{{dude.name}} use {{weapon.favorite}}. The goal is {{goal}}."`;

tampax.yamlParseString(yamlString, {goal: 'to kill Mordred'}, (err, data) => {
	if (err) {
		throw err;
	}

	console.log(data);
  /* => { dude: { name: 'Arthur' },
  weapon: { favorite: 'Excalibur', useless: 'knife' },
  sentence: 'Arthur use Excalibur. The goal is to kill Mordred.' }
  */
});
