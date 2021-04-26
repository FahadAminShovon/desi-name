# Desi-name

A name validator for desi people

we all know someone with a very big name , or perhaps a name with multiple special charactesr.

my own name has two dots and two hypens,

so I build a validator for people who has name like me

allowed special characters are `-_` and spaces,

byDefault name length between 3 to 20 is valid

you can change the validity length by passing `maxLen` and `minLen`

consecutive spaces and special characters are not allowed,

numbers not allowd,
name can end with spaces or letters

example;

```js
const { isDesiName } = require('desi-name');

console.log(isDesiName({ name: 'md. abdus-malek_ansari' }));
//will return true

console.log(isDesiName({ name: 'abduss....kudduss' }));
//will return false
```
