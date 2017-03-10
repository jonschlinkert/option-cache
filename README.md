# option-cache [![NPM version](https://img.shields.io/npm/v/option-cache.svg?style=flat)](https://www.npmjs.com/package/option-cache) [![NPM monthly downloads](https://img.shields.io/npm/dm/option-cache.svg?style=flat)](https://npmjs.org/package/option-cache)  [![NPM total downloads](https://img.shields.io/npm/dt/option-cache.svg?style=flat)](https://npmjs.org/package/option-cache) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/option-cache.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/option-cache) [![Windows Build Status](https://img.shields.io/appveyor/ci/jonschlinkert/option-cache.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/jonschlinkert/option-cache)

> Simple API for managing options in JavaScript applications.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save option-cache
```

## Example app

Use options-cache in your javascript application:

```js
var util = require('util');
var Options = require('options-cache');

function App(options) {
  Options.call(this, options);
  this.init();
}

util.inherits(App, Options);

App.prototype.init = function() {
  this.option('cwd', process.cwd());
  this.option('foo', 'bar');
};

App.prototype.a = function(value) {
  this.enable(value);
};

App.prototype.b = function(value) {
  if (this.enabled(value)) {
    // do something
  } else {
    // do something else
  }
};
```

## API

### [Options](index.js#L24)

Create a new instance of `Options`.

**Params**

* `options` **{Object}**: Initialize with default options.

**Example**

```js
var app = new Options();
```

### [.option](index.js#L61)

Set or get an option. When getting an option that is not set but has a default value set, the default value will be returned.

**Params**

* `key` **{String}**: The option name.
* `value` **{any}**: The value to set.
* `returns` **{any}**: Returns a `value` when only `key` is defined.

**Example**

```js
app.option('a', true);
app.option('a');
//=> true
app.default('b', false);
app.option('b');
//=> false
```

### [.default](index.js#L104)

Set or get a default.

**Params**

* `key` **{String}**: The default name.
* `value` **{any}**: The value to set.
* `returns` **{any}**: Returns a `value` when only `key` is defined.

**Example**

```js
app.default('a', true);
app.default('a');
//=> true
```

**Params**

* `options` **{Object}**
* `returns` **{Object}**

**Example**

```js
app.mergeOptions({a: 'b'}, {c: 'd'});
app.option('a');
//=> 'b'
app.option('c');
//=> 'd'
```

**Params**

* `key` **{String}**
* `value` **{any}**
* `type` **{String}**: Javascript native type (optional)
* `returns` **{Object}**

**Example**

```js
app.option('a', 'b');

app.fillin('a', 'z');
app.fillin('x', 'y');

app.option('a');
//=> 'b'
app.option('x');
//=> 'y'
```

### [.hasOption](index.js#L229)

Return true if `options.hasOwnProperty(key)`

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: True if `prop` exists.

**Example**

```js
app.hasOption('a');
//=> false
app.option('a', 'b');
app.hasOption('a');
//=> true
```

### [.hasDefault](index.js#L252)

Return true if `defaults.hasOwnProperty(key)`

**Params**

* `key` **{String}**
* `returns` **{Boolean}**: True if `key` exists.

**Example**

```js
app.hasDefault('a');
//=> false
app.default('a', 'b');
app.hasDefault('a');
//=> true
```

### [.enable](index.js#L271)

Enable `key`.

**Params**

* `key` **{String}**
* `returns` **{Object}** `Options`: to enable chaining

**Example**

```js
app.enable('a');
```

### [.disable](index.js#L288)

Disable `key`.

**Params**

* `key` **{String}**: The option to disable.
* `returns` **{Object}** `Options`: to enable chaining

**Example**

```js
app.disable('a');
```

### [.enabled](index.js#L310)

Check if `prop` is enabled (truthy).

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**

**Example**

```js
app.enabled('a');
//=> false

app.enable('a');
app.enabled('a');
//=> true
```

### [.disabled](index.js#L332)

Check if `prop` is disabled (falsey).

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Returns true if `prop` is disabled.

**Example**

```js
app.disabled('a');
//=> true

app.enable('a');
app.disabled('a');
//=> false
```

### [.isTrue](index.js#L359)

Returns true if the value of `prop` is strictly `true`.

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Uses strict equality for comparison.

**Example**

```js
app.option('a', 'b');
app.isTrue('a');
//=> false

app.option('c', true);
app.isTrue('c');
//=> true

app.option({a: {b: {c: true}}});
app.isTrue('a.b.c');
//=> true
```

### [.isFalse](index.js#L386)

Returns true if the value of `key` is strictly `false`.

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Uses strict equality for comparison.

**Example**

```js
app.option('a', null);
app.isFalse('a');
//=> false

app.option('c', false);
app.isFalse('c');
//=> true

app.option({a: {b: {c: false}}});
app.isFalse('a.b.c');
//=> true
```

### [.isBoolean](index.js#L410)

Return true if the value of key is either `true` or `false`.

**Params**

* `key` **{String}**
* `returns` **{Boolean}**: True if `true` or `false`.

**Example**

```js
app.option('a', 'b');
app.isBoolean('a');
//=> false

app.option('c', true);
app.isBoolean('c');
//=> true
```

## About

### Related projects

* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
* [cache-base](https://www.npmjs.com/package/cache-base): Basic object cache with `get`, `set`, `del`, and `has` methods for node.js/javascript projects. | [homepage](https://github.com/jonschlinkert/cache-base "Basic object cache with `get`, `set`, `del`, and `has` methods for node.js/javascript projects.")
* [config-cache](https://www.npmjs.com/package/config-cache): General purpose JavaScript object storage methods. | [homepage](https://github.com/jonschlinkert/config-cache "General purpose JavaScript object storage methods.")
* [map-cache](https://www.npmjs.com/package/map-cache): Basic cache object for storing key-value pairs. | [homepage](https://github.com/jonschlinkert/map-cache "Basic cache object for storing key-value pairs.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 91 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2 | [tunnckoCore](https://github.com/tunnckoCore) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 10, 2017._