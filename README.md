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

> Words in SENĆOŦEN list: 11888<br/>
> Trie x 473,351 ops/sec ±2.40% (83 runs sampled)<br/>
> Array x 1,448,714 ops/sec ±1.89% (85 runs sampled)<br/>
> Fastest is **Array**<br/>

#### Word does NOT exist in wordlist

> Trie x 475,104 ops/sec ±1.60% (87 runs sampled)<br/>
> Array x 1,012,480 ops/sec ±1.71% (86 runs sampled)<br/>
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
