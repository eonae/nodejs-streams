const stream = require('stream');

module.exports = class StreamingParser extends stream.Transform {

  constructor(delimiter, ctor, props) {
    super({ objectMode: true })
    this.delimiter = delimiter;
    this.ctor = ctor;
    this.props = props;
  }

  _transform(chunk, _, done) {
    this.push(chunk.toString()
      .split(this.delimiter)
      .reduce((acc, item, index) => {
        acc[this.props[index]] = item
        return acc;
      }, new this.ctor()));
    done();
  }
}