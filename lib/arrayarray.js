'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, a, b, c[, rand] )
*	Creates a multidimensional array of triangular distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with triangular random numbers
*/
function random( dims, a, b, c, rand ) {
	var draw = partial( a, b, c, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
