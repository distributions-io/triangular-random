'use strict';

// FUNCTIONS //

var sqrt = Math.sqrt;


// GENERATE TRIANGULAR RANDOM NUMBERS //

/**
* FUNCTION random( a, b, c[, rand] )
*	Generates a random draw from a triangular distribution with parameters `a`, `b` and `c`.
*
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( a, b, c, rand ) {
	var u,
		pInflection = ( c - a ) / ( b - a ),
		fact1 = ( b - a ) * ( c - a),
		fact2 = ( b - a ) * ( b - c );

	u = rand ? rand() : Math.random();
	if ( u  < pInflection ) {
		return a + sqrt( fact1 * u );
	}
	if ( u > pInflection ) {
		return b - sqrt( fact2 * ( 1 - u ) );
	}
}

module.exports = random;
