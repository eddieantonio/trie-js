dict/nrc.sal.trie.js: dict/nrc.sal.array.txt build-trie.js
	node build-trie.js $< > $@
