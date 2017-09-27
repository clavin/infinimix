const stream = require('stream');

/** A class to store everything written to it to memory. */
module.exports = class StreamBucket extends stream.Writable {
  constructor() {
    super();
    this.data = [];
  }

  /** Writes a chunk of data to the memory store. */
  _write(chunk, encoding, callback) {
    this.data.push.apply(this.data, chunk);
    callback();
  }
};
