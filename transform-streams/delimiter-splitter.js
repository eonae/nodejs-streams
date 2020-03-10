const stream = require('stream');

module.exports = class DelimiterSplitter extends stream.Transform {
  constructor (options) {
    super();
    this.buf = Buffer.alloc(0);
    this.options = options;
  }

  _transform (chunk, _, cb) {
    console.log('------------------------------------------------');
    console.log('chunk length: ' + chunk.length + ' bytes');
    console.log('------------------------------------------------');
    const { delimiters } = this.options;
    
    this.buf = Buffer.concat([ this.buf, chunk ]);

    const byPosAsc = (x1, x2) => x1.pos > x2.pos ? 1 : -1;
    const isFound = x => x.pos !== -1;

    const getDelimiter = () => {
      return delimiters
        .map(d => ({ bytes: d.bytes, include: d.include, pos: this.buf.indexOf(d.bytes)}))
        .filter(isFound)
        .sort(byPosAsc)[0];
    }

    let delimiter;
    while (delimiter = getDelimiter()) {
      const { bytes, pos, include } = delimiter;
      this.push(this.buf.slice(0, pos + (include ? bytes.length : 0)));
      this.buf = this.buf.slice(pos + bytes.length);
    }

    cb();
  }

  _flush (cb) {
    this.push(this.buf);
    this.buf = Buffer.alloc(0);
    cb();
  }
}