# [A Simple JavaScript Trie Generator](http://ejohn.org/blog/javascript-trie-performance-analysis/)
## By John Resig

## Eddie's benchmarking

This compares searching the wordlist as an array (binary search) in and John Resig's
suffix trie implementation.

    npm install
    node suite.js

### Results

Benchmarks were performed on my 2013 Macbook Pro with node v10.7.0, and
on my 2016 OnePlus 3T (A3000) with Android 8.0.0/Chrome 72.0.3626.76.

Words in SENĆOŦEN list: 11,888.

#### Word exists in wordlist

Macbook:

> Words in SENĆOŦEN list: 11888<br/>
> Trie x 473,351 ops/sec ±2.40% (83 runs sampled)<br/>
> Array x 1,448,714 ops/sec ±1.89% (85 runs sampled)<br/>
> Fastest is **Array**<br/>

Android:

> Trie x 211,606 ops/sec ±1.01% (56 runs sampled)
> Array x 745,451 ops/sec ±0.51% (58 runs sampled)
> Fastest is **Array**

#### Word does NOT exist in wordlist

Macbook:

> Trie x 475,104 ops/sec ±1.60% (87 runs sampled)<br/>
> Array x 1,012,480 ops/sec ±1.71% (86 runs sampled)<br/>
> Fastest is **Array**<br/>

Android:

> Trie x 217,272 ops/sec ±1.12% (58 runs sampled)
> Array x 462,619 ops/sec ±1.30% (59 runs sampled)
> Fastest is **Array**

It seems that binary searching in a word list is faster than the trie,
both for looking up a word in the list, and looking up words that do not
exist.

However, at over 200 thousand operations per second on a three year old
phone, the trie may be plenty fast enough.

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
