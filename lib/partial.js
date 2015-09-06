'use strict';

// FUNCTIONS //

var sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( a, b, c[, rand] )
*	Partially applies `a`, `b` and `c` and returns a function to generate random variables from the triangular distribution.
*
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( a, b, c, rand ) {
	var random,
		pInflection = ( c - a ) / ( b - a ),
		fact1 = ( b - a ) * ( c - a),
		fact2 = ( b - a ) * ( b - c );

	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}

	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a triangular distribution with parameters `a`, `b` and `c`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var u = random();
		if ( u  < pInflection ) {
			return a + sqrt( fact1 * u );
		}
		if ( u > pInflection ) {
			return b - sqrt( fact2 * ( 1 - u ) );
		}
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
