<p align="center">
  <img src="icon/logo.svg" height="150">
  <h3 align="center">tampax</h3>
  <p align="center">YAML, extended to support inline variables.<p>
  <p align="center"><a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="XO code style"></a> <a href="https://travis-ci.org/arthurlacoste/tampax"><img src="https://secure.travis-ci.org/arthurlacoste/tampax.svg" alt="build status"></a>
  </p>
</p>
 
Now, replacing strings is now as simple as fill a hole.

Template string, files, and even YAML. 
  
## Installation

`npm install tampax --save`

## Example

### Using YAML variables

This example show how you can use both object-related variables included in your YAML structure and give an object to feed your object. This is optionnal to give an object to this function.

```js
const tampax = require('tampax');

const yamlString = `
dude:
  name: Arthur
weapon:
  favorite: Excalibur
  useless: knife
sentence: "{{dude.name}} use {{weapon.favorite}}. The goal is {{goal}}."`;

const r = tampax.yamlParseString(yamlString, { goal: 'to kill Mordred' });
console.log(r.sentence);

// output : "Arthur use Excalibur. The goal is to kill Mordred."
```
	
```js
let tampax = require("tampax")
let result

// Format using an object hash with keys matching [0-9a-zA-Z.]+

result = tampax("Hello {{name}}, you have {{count}} unread messages", {
    name: "Robert",
    count: 12
})
console.log(result);
// result -> "Hello Robert, you have 12 unread messages"


// Format using a number indexed array

result = tampax("Hello {{0}}, you have {{1}} unread messages", ["Robert", 12])
console.log(result);
// result -> "Hello Robert, you have 12 unread messages"
```

Escape {{}} pairs by using triple {{}}}

```js
var text = tampax("{{{0}}}")
// text -> "{{0}}"

```
## Doc

### yamlParseString(string[, args]) 

find all occurences of {{mystring}}, and a correspondance in the YAML file itself, and the optionnal `args` parameter.

- **string** `required` {YAML string} A YAML string to parse.
- **args** `optionnal` {object} Object to find. If a previous value is given in the YAML file, this object replace it.
- **return** {object} Return an object with everything replaced.

## Related projects

* [string-template](https://github.com/Matt-Esch/string-template)
* [js-yaml](https://github.com/nodeca/js-yaml)
* [flat](https://github.com/hughsk/flat)

## Licence
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) 

Arthur Lacoste