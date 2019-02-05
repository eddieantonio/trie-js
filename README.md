# [A Simple JavaScript Trie Generator](http://ejohn.org/blog/javascript-trie-performance-analysis/)
## By John Resig

## Eddie's benchmarking

This compares searching the wordlist as an array (binary search) in and John Resig's
suffix trie implementation.

    npm install
    node suite.js

### Results

Benchmarks done on my 2013 Macbook Pro, node v10.7.0.

#### Word exists in wordlist

> Trie x 502,285 ops/sec ±2.47% (82 runs sampled)<br/>
> Array x 8,288,375 ops/sec ±2.43% (84 runs sampled)<br/>
> Fastest is **Array**<br/>

#### Word does NOT exist in wordlist

> Trie x 483,315 ops/sec ±2.19% (86 runs sampled)<br/>
> Array x 3,463,789 ops/sec ±2.96% (82 runs sampled)<br/>
> Fastest is **Array**<br/>

It seems that binary searching in a word list is faster than the trie,
both for looking up a word in the list, and looking up words that do not
exist.

However, at over 300 thousand operations per second on a 2013 MacBook,
the trie may be fast enough.

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
