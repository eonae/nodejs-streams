const ascii = Buffer.from('hello world', 'ascii');
const base64 = Buffer.from('hello world', 'base64');
const binary = Buffer.from('hello world', 'binary');

console.log(ascii);
console.log(base64);
console.log(binary);

console.log(base64.toString('base64'));