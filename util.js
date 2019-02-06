var dict,
	trie
	FrozenTrie = require("./Bits.js").FrozenTrie;

exports.buildTrie = function( txt ) {
	return (trie = eval( "(" + txt + ")" ));
};

exports.buildBinaryDict = function( words ) {
	let wordsByLength = [];

	for (let word of words) {
		let l = word.length;
		let subarray = wordsByLength[l];
		if (!subarray) {
			subarray = wordsByLength[l] = [];
		}
		subarray.push(word);
	}

	for (let i = 0, l = wordsByLength.length; i < l; i++) {
		wordsByLength[i] = (wordsByLength[i] || []).sort();
	}

	// Ensure the array for zero-length strings is empty
	// We do not want to match the empty string!
	wordsByLength[0] = [];

	return dict = wordsByLength;
};

exports.buildSuccinctDict = function( txt ) {
	var parts = txt.split(",");

	return (dict = new FrozenTrie( parts[2], parts[1], parts[0] ));
};

exports.buildStringDict = function( txt ) {
	return (dict = " " + txt + " ");
};

exports.buildHashDict = function( txt ) {
	var words = txt.split(" "),
		tmp = {};

	for ( var i = 0, l = words.length; i < l; i++ ) {
		tmp[ words[i] ] = true;
	}

	return (dict = tmp);
};

exports.findTrieWord = function findTrieWord( word, cur ) {

	if ( cur === 0 ) {
		return false;
	}

	cur = cur || trie;

	for ( var node in cur ) {
		if ( word.indexOf( node ) === 0 ) {
			var val = typeof cur[ node ] === "number" && cur[ node ] ?
				trie.$[ cur[ node ] ] :
				cur[ node ];

			if ( node.length === word.length ) {
				return val === 0 || val.$ === 0;

			} else {
				return findTrieWord( word.slice( node.length ), val );
			}
		}
	}

	return false;
};

exports.findBinaryWord = function( word ) {
	var l = word.length;
	let subarray = dict[l];

	if (!subarray) {
		return false;
	}

	var words = subarray.length,
		low = 0,
		high = words - 1,
		mid = Math.floor( words / 2 );

	while (high >= low) {
		var found = subarray[mid];

		if (word === found) {
			return true;
		}

		if (word < found) {
			high = mid - 1; // exclude `found`
		} else {
			low = mid + 1; // exclude `found`
		}

		mid = Math.floor( (low + high) / 2 );
	}

	return false;
};

exports.findSuccinctWord = function( word ) {
	return dict.lookup( word );
};

exports.findStringWord = function( word ) {
	return dict.indexOf( " " + word + " " ) > -1;
};

exports.findHashWord = function( word ) {
	return !!dict[ word ];
};
