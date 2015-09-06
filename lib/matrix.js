'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, a, b, c[, rand] )
*	Creates a matrix of triangular distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with triangular random numbers
*/
function random( dims, dt, a, b, c, rand ) {
	var out,
		draw,
		i;

	draw = partial( a, b, c, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
