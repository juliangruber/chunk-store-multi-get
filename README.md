
# chunk-store-multi-get

  Get multiple chunks off a [chunk-store](https://npmjs.org/package/abstract-chunk-store), in parallel.

[![abstract chunk store](https://cdn.rawgit.com/mafintosh/abstract-chunk-store/master/badge.svg)](https://github.com/mafintosh/abstract-chunk-store)

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

  Options are:

  - `chunkLength`: the chunk length of the store (required)
  - `index`: the index to start at (required)
  - `length`: the total length to read (required)
  - `offset`

## License

  MIT

