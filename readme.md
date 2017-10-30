# tampax

[![build status][travis-badge]][travis-url]

Replacing strings is now as simple as fill a hole.

Template string, files, and even YAML. 
  
## Installation

`npm install tampax --save`
  
## Example

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

## Licence
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) 

Arthur Lacoste, forked from [string-template](https://github.com/Matt-Esch/string-template).

  [travis-badge]: https://secure.travis-ci.org/arthurlacoste/tampax.svg
  [travis-url]: https://travis-ci.org/arthurlacoste/tampax