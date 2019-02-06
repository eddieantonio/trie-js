let Benchmark = require('benchmark');

if (typeof window !== 'undefined') {
  // Benchmark is weird about being both in Window and in a module,
  // so make it a browser global to be happy.
  window.Benchmark = Benchmark;
}

let util = require('./util');
let fs = require('fs');

let rawWords = fs.readFileSync('./dict/nrc.sal.array.txt', 'utf8');
let words = rawWords.split(' ');
/**
 * Initialization
 */
let trie = util.buildTrie(fs.readFileSync('./dict/nrc.sal.trie.js', 'utf8'));
let bin = util.buildBinaryDict(words);

log(`Words in SENĆOŦEN list: ${words.length}`);

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
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run();

let failedLookupSuite = new Benchmark.Suite('Finding a word that does not exist');
failedLookupSuite
  .add('Trie', function () {
    util.findTrieWord(randomNonWord());
  })
  .add('Array', function () {
    util.findBinaryWord(randomNonWord())
  })
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run();

/**
 * As a baseline:
 */
(new Benchmark.Suite('Generating a word'))
  .add('randomWord()', function () {
    randomWord()
  })
  .add('randomNonWord()', function () {
    randomNonWord()
  })
  .on('cycle', onCycle)
  .on('complete', onComplete)
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

function onCycle (event) {
  log('' + event.target);
}

function onComplete () {
  log(`Fastest is **${this.filter('fastest').map('name')}**`);
}

function log(txt) {
  if (typeof window !== 'undefined') {
    document.write(`<output>${txt}</output>`);
  } else {
    console.log(`> ${txt}<br/>`);
  }
}
