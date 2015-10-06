
# chunk-store-multi-get

  Get multiple chunks off a chunk-store, in parallel.

## Example

```js
var get = require('chunk-store-multi-get');
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
```

## Installation

```bash
$ npm install chunk-store-multi-get
```

## API

### get(store, opts, cb)

  Get chunks off `store` and call `cb` with the potential error and the result buffer.

  Required options are:

  - `chunkLength`: the chunk length of the store
  - `index`: the index to start at
  - `length`: the total length to read

## License

  MIT
