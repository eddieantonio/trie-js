# [A Simple JavaScript Trie Generator](http://ejohn.org/blog/javascript-trie-performance-analysis/)
## By John Resig

## Eddie's benchmarking

This compares searching the wordlist as an array (binary search) in and John Resig's
suffix trie implementation.

    npm install
    node suite.js

### Results

> Trie lookup (entry exists) x 413,275 ops/sec ±1.46% (83 runs sampled)
> Array lookup (entry exists) x 12,391,280 ops/sec ±1.62% (85 runs sampled)
> Fastest is Array lookup (entry exists)

The Array binary search lookup is superior in speed! 

---

Original README follows:

Copyright 2011 John Resig  
MIT Licensed

All code is designed to work in Node.js.

To clone this repository including the [Benchmark.js](http://benchmarkjs.com/) submodule:

    git clone --recursive https://github.com/jeresig/trie-js.git

To build an optimized Trie run:

    node build-trie.js > dict/suffix.js

To dump a full dictionary of words from the Trie do:

    node dump-trie.js

A sample function for finding a word in the Trie can be see in `util.js`, named `findTrieWord`.
