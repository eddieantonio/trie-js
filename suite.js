let Benchmark = require('benchmark');
let suite = new Benchmark.Suite;

let util = require('./util');
let fs = require('fs');

let rawWords = fs.readFileSync('./dict/string.txt', 'utf8');
let words = rawWords.split(' ');
/**
 * Initialization
 */
let trie = util.buildTrie(fs.readFileSync('./dict/suffix.js', 'utf8'));
let arr = util.buildBinaryDict(rawWords);

suite
  .add('Trie lookup (entry exists)', function () {
    util.findTrieWord(randomWord());
  })
  .add('Array lookup (entry exists)', function () {
    util.findBinaryWord(randomWord())
  })
  .on('cycle', function (event) {
    console.log('' + event.target);
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });


function randomWord() {
  return words[~~(Math.random() * words.length)];
}
