<p align="center">
  <img src="icon/logo.svg" height="150">
  <h3 align="center">tampax</h3>
  <p align="center">YAML, extended to support inline variables.<p>
  <p align="center"><a href="https://npmjs.org/package/tampax"><img src="https://img.shields.io/npm/v/tampax.svg" alt="NPM Version"></a> <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="XO code style"></a> <a href="https://travis-ci.org/arthurlacoste/tampax"><img src="https://secure.travis-ci.org/arthurlacoste/tampax.svg" alt="build status"></a>
  </p>
</p>
 
Replacing strings is now as simple as fill a hole.

Template string, files, and even YAML.

## Introduction

I love YAML. In many ways. But sometimes, we need "just a little bit more". Tampax is the more, by providing a way to parse recursively the internal structure of YAML to use variables inside of it. 
  
## Installation

`npm install tampax --save`

## Example

### Using YAML variables

This example show how you can use both object-related variables included in your YAML structure and give an object to feed your object. This is optional to give an object to this function.

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


### Templating string without YAML

There is 2 ways to do this.

First, by passing an object with the equivalent name :

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

```
<a name="array-using"></a>
Or by using an old-fashion-way to do, by passing an array, and using numbers.

```js
// Format using a number indexed array

result = tampax("Hello {{0}}, you have {{1}} unread messages", ["Robert", 12])
console.log(result);
// result -> "Hello Robert, you have 12 unread messages"
```


## Doc

### tampax(string, args) 

find all occurences of {{mystring}} in the string, and replace it.

- **string** `required` {YAML string} A YAML string to parse.
- **args** `required ` {Object|Array} Variables to find. If an array is given, you [need to use numbers instead of words](#array-using).
- **return** {string} Return a string with everything replaced.

### tampax.yamlParseString(string[, args]) 

find all occurences of {{mystring}}, and a correspondance in the YAML file itself, and the optional `args` parameter.

- **string** `required` {YAML string} A YAML string to parse.
- **args** `optional` {Object} Variables to find. If a previous value is given in the YAML file, this object replace it.
- **return** {Object} Return an object with everything replaced.


### Escaping

Escape {{}} pairs by using triple {{}}}

```js
var text = tampax("{{{0}}}")
// text -> "{{0}}"

```

## Related projects

* [string-template](https://github.com/Matt-Esch/string-template)
* [js-yaml](https://github.com/nodeca/js-yaml)
* [flat](https://github.com/hughsk/flat)

## Licence
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) 

Arthur Lacoste