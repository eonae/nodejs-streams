
const getReadable = require('./get-readable');
const Chunker = require('./transform-streams/chunker');
const WordSplitter = require('./transform-streams/word-splitter');
const DelimiterSplitter = require('./transform-streams/delimiter-splitter');
const StreamingParser = require('./transform-streams/streaming-parser');
const fs = require('fs');

let counter = 0;
const log = data => console.log(`${++counter}\t${data.toString()}<`);

const options = {
  d: ' ',
  incl: false
}

class Person {
  get fullname () {
    return this.name + ' ' + this.surname;
  }
}

const splitter = new DelimiterSplitter({
  delimiters: [ { bytes: '\n', include: false } ]
});

const parser = new StreamingParser(',', Person, [
  'name', 'surname', 'patronymic', 'sex', 'age', 'profession', 'hobby', 'marital'
]);

// fs.createReadStream('./sample.csv')
//   .pipe(splitter)
//   .pipe(parser)
//   .on('data', obj => {
//     console.log(JSON.stringify(obj))
//   });

const Source = require('./readable');



new Source().pipe(process.stdout);