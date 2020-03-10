const stream = require('stream');

module.exports = class Chunker extends stream.Transform {
  constructor (bytesInChunk) {
    super();
    this.buf = Buffer.alloc(0);
    this.l = bytesInChunk;
  }
  
  _transform (chunk, _, done) {
    this.buf = Buffer.concat([ this.buf, chunk ]);
    while (this.buf.length >= this.l) {
      this.push(this.buf.slice(0, this.l));
      this.buf = this.buf.slice(this.l);
    }
    done();
  }
  
  _flush (done) {
    this.push(this.buf);
    done();
  }
}