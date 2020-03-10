const stream = require('stream');

module.exports = class WordSplitter extends stream.Transform {
  constructor (options) {
    super();
    this.options = options;
    this.buf = Buffer.alloc(0);
  }

  _transform (chunk, _, cb) {
    this.buf = Buffer.concat([ this.buf, chunk ]);

    let { d, incl } = this.options;
    if (Array.isArray(d)) d = Buffer.from(d);
    
    let pos;
    while ((pos = this.buf.indexOf(d)) !== -1) {
      this.push(Buffer.concat([ this.buf.slice(0, pos + (incl ? d.length : 0))]));
      this.buf = this.buf.slice(pos + d.length);
    };
    cb();
  }

  _flush (cb) {
    this.push(this.buf);
    cb();
  }
}