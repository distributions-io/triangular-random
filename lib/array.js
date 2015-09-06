'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, a, b, c[, rand] )
*	Creates an array of triangular distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with triangular random numbers
*/
function random( len, a, b, c, rand ) {
	var out,
		draw,
		i;

	draw = partial( a, b, c, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
