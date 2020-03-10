const stream = require('stream');

const data = [
  'Hello from underground!\n',
  'You miserable fool!\n'
]

module.exports = class Source extends stream.Readable {
  constructor() {
    super();
    this.counter = 0;  
  }
  _read () {
    this.push(data[this.counter++]);
  }
}