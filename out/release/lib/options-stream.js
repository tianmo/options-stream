// Generated by CoffeeScript 1.4.0
var fs, ini, ion, merge, path, yaml,
  __slice = [].slice;

fs = require('fs');

path = require('path');

yaml = require('yamljs');

ini = require('ini');

ion = require('ion/lib/ion-min');

merge = function(o1, o2) {
  var iso1, iso2, k;
  for (k in o2) {
    iso1 = typeof o1[k] === 'object' && o2[k] !== null && 0 === o1[k].constructor.toString().indexOf('function Object()');
    iso2 = typeof o2[k] === 'object' && o2[k] !== null && 0 === o2[k].constructor.toString().indexOf('function Object()');
    if (iso1 && iso2) {
      merge(o1[k], o2[k]);
    } else if (o2[k] !== void 0) {
      o1[k] = o2[k];
    }
  }
  return o1;
};

module.exports = function() {
  var arg, args, c, freeze, _i, _j, _len, _ref;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  c = {};
  freeze = false;
  if (typeof args[args.length - 1] === 'boolean') {
    _ref = args, args = 2 <= _ref.length ? __slice.call(_ref, 0, _i = _ref.length - 1) : (_i = 0, []), freeze = _ref[_i++];
  }
  for (_j = 0, _len = args.length; _j < _len; _j++) {
    arg = args[_j];
    if (typeof arg === 'string') {
      merge(c, (function() {
        switch (path.extname(arg)) {
          case '.ini':
            return ini.parse(fs.readFileSync(arg).toString());
          case '.json':
            return JSON.parse(fs.readFileSync(arg));
          case '.yml':
          case '.yaml':
            return yaml.parse(fs.readFileSync(arg).toString().trim());
          case '.ion':
            return ion.parse(fs.readFileSync(arg).toString().trim().replace(/\n/igm, '\r\n'));
        }
      })());
    } else if (arg !== void 0) {
      merge(c, arg);
    }
  }
  if (freeze) {
    Object.freeze(c);
  }
  return c;
};
