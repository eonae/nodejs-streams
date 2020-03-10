const stream = require('stream');

async function *generate (maxChunkLength) {
  const buf = Buffer.from('this is real hello world for transform streams!', 'ascii');
  let pos = 0;
  while (true) {
    let num = Math.floor(Math.random() * maxChunkLength) % maxChunkLength + 1;
    if (pos + num >= buf.length - 1) {
      yield buf.slice(pos);
      break;
    } else {
      yield buf.slice(pos, pos + num);
      pos += num;
    }
  }
}

module.exports = maxChunkLength => stream.Readable.from(generate(maxChunkLength));