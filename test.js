var test = require('tape');
var get = require('./');
var mem = require('memory-chunk-store');

test('single chunk', function(t){
  var chunks = mem(10);
  chunks.put(0, Buffer('0123456789'), function(err){
    t.error(err);
    get(chunks, {
      index: 0,
      length: 10,
      chunkLength: 10
    }, function(err, buf){
      t.error(err);
      t.equal(buf.toString(), '0123456789');
      t.end();
    });
  });
});

test('two whole chunks', function(t){
  var chunks = mem(10);
  chunks.put(0, Buffer('0123456789'), function(err){
    t.error(err);
    chunks.put(1, Buffer('0123456789'), function(err){
      t.error(err);

      get(chunks, {
        index: 0,
        length: 20,
        chunkLength: 10
      }, function(err, buf){
        t.error(err);
        t.equal(buf.toString(), '01234567890123456789');
        t.end();
      });
    });
  });
});

test('cut off chunks', function(t){
  var chunks = mem(10);
  chunks.put(0, Buffer('0123456789'), function(err){
    t.error(err);
    chunks.put(1, Buffer('0123456789'), function(err){
      t.error(err);

      get(chunks, {
        index: 0,
        length: 15,
        chunkLength: 10
      }, function(err, buf){
        t.error(err);
        t.equal(buf.toString(), '012345678901234');
        t.end();
      });
    });
  });
});
