var get = require('./');
var mem = require('memory-chunk-store');

function fill(store, size, cb){
  var todo = Number(size);
  for (var i = 0; i < size; i++) (function(i){
    store.put(i, Buffer('0123456789'), function(err){
      if (err) throw err;
      if (!--todo) cb();
    });
  })(i);
}

var size = 1000000;
var chunkLength = 10;
var store = mem(chunkLength);

fill(store, size, function(){
  var start = new Date;

  get(store, {
    index: 0,
    length: size * chunkLength,
    chunkLength: chunkLength
  }, function(err, buf){
    if (err) throw err;

    console.log('%sms', new Date - start);
    store.close();
  });
});
