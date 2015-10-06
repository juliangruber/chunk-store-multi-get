var get = require('./');
var mem = require('memory-chunk-store');

var chunks = mem(10);
chunks.put(0, Buffer('0123456789'), function(err){
  if (err) throw err;
  chunks.put(1, Buffer('0123456789'), function(err){
    if (err) throw err;

    get(chunks, {
      index: 0,
      length: 15,
      chunkLength: 10
    }, function(err, buf){
      if (err) throw err;
      console.log(buf.toString());
      // => 012345678901234

      chunks.close();
    });
  });
});
