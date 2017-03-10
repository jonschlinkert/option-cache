'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('arr-flatten', 'flatten');
require('collection-visit', 'visit');
require('get-value', 'get');
require('has-value', 'has');
require('kind-of', 'typeOf');
require('koalas');
require('merge-deep', 'merge');
require('set-value', 'set');
require('to-object-path', 'toPath');
require = fn;

utils.defaults = function(thisArg, key) {
  var opt = utils.get(thisArg.options, key);

  // if the option is explicitly set to NULL, return it
  if (opt === null) {
    return opt;
  }

  var def = utils.get(thisArg.defaults, key);
  var val = utils.koalas(opt, def);
  // if no option nor default is set, return undefined
  if (val === null) {
    return;
  }

  // return the found value
  return val;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
