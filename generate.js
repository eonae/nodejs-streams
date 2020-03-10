const generate = require('csv-generate');
const fs = require('fs');

generate({ length: 1000 }).pipe(fs.createWriteStream('./sample.csv'));