let Benchmark = require('benchmark');

let util = require('./util');
let fs = require('fs');

let rawWords = fs.readFileSync('./dict/string.txt', 'utf8');
let words = rawWords.split(' ');
/**
 * Initialization
 */
let trie = util.buildTrie(fs.readFileSync('./dict/suffix.js', 'utf8'));
let arr = util.buildBinaryDict(rawWords);

/**
 * Finding a true word.
 */
let lookupSuite = new Benchmark.Suite('Finding a word that exists');
lookupSuite
  .add('Trie', function () {
    util.findTrieWord(randomWord());
  })
  .add('Array', function () {
    util.findBinaryWord(randomWord())
  })
  .on('cycle', function (event) {
    console.log('' + event.target);
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();

let failedLookupSuite = new Benchmark.Suite('Finding a word that does not exist');
failedLookupSuite
  .add('Trie', function () {
    util.findTrieWord(randomNonWord());
  })
  .add('Array', function () {
    util.findBinaryWord(randomNonWord())
  })
  .on('cycle', function (event) {
    console.log('' + event.target);
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();


function randomWord() {
  return words[~~(Math.random() * words.length)];
}

function randomNonWord() {
  // Base it off of a REAL word, so that we will get a partial match in the
  // wordlist.
  let word = randomWord();
  // Replace a random letter in the middle of the REAL word with a private-use
  // character. This will be one character off, but never exist inside the
  // real dictionary.
  let pos = ~~(Math.random() * word.length);
  let c = String.fromCharCode(0xE000 | word.charCodeAt(pos))
  return word.substring(0, pos) + c + word.substring(pos + 1);
}
