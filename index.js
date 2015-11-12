var assert = require('assert');
var once = require('once');

module.exports = get;

function get(store, opts, cb){
  assert(typeof opts.length != 'undefined', '.length required');
  assert(typeof opts.index != 'undefined', '.index required');
  assert(typeof opts.chunkLength != 'undefined', '.chunkLength required');

  offset = opts.offset || 0;
  assert(offset < opts.chunkLength, '.offset must be smaller than .chunkLength');

  cb = once(cb);
  var bufs = [];
  var chunks = Math.ceil(opts.length / opts.chunkLength);
  var todo = Number(chunks);

  for (var i = 0; i < chunks; i++) (function(i){
    var _opts = {};
    if (i == chunks - 1) _opts.length = opts.length % opts.chunkLength + offset;
    if (i == 0) _opts.offset = offset;

    store.get(opts.index + i, _opts, function(err, buf){
      if (err) return cb(err);
      bufs[i] = buf;
      if (!--todo) cb(null, Buffer.concat(bufs, opts.length));
    });
  })(i);
};
