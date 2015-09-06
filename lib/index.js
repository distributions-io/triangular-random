'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	lcg = require( 'compute-lcg' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' ),
	number = require( './number.js' );


// UNIFORM GENERATOR //

var RAND = lcg();


// TRIANGULAR RANDOM VARIATES //

/**
* FUNCTION: random( [dims][, opts] )
*	Creates a matrix or array filled with triangular random numbers.
*
* @param {Number|Number[]} [dims] - dimensions
* @param {Object} [opts] - function options
* @param {Number} [opts.a=0] - lower limit
* @param {Number} [opts.b=1] - upper limit
* @param {Number} [opts.c=(opts.a+opts.b)/2] - mode
* @param {String} [opts.dtype="generic"] - output data type
* @param {Number} [opts.seed] - integer-valued seed
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} random numbers
*/
function random( dims, options ) {
	var opts = {},
		isArray,
		ndims,
		err,
		len,
		a,
		b,
		c,
		rand,
		dt;

	if ( arguments.length > 0 ) {
		isArray = isPositiveIntegerArray( dims );
		if ( !isArray && !isPositiveInteger( dims ) ) {
			throw new TypeError( 'random()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
		}
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.seed ) {
		rand = lcg( opts.seed );
	} else {
		rand = RAND;
	}
	dt = opts.dtype || 'generic';

	a = typeof opts.a !== 'undefined' ? opts.a : 0;
	b = typeof opts.b !== 'undefined' ? opts.b : 1;
	c = typeof opts.c !== 'undefined' ? opts.c : ( a + b ) / 2;

	if ( b <= a ) {
		throw new TypeError( 'random()::invalid input options. Parameter `a` must be smaller than `b`.' );
	}
	if ( arguments.length === 0 ) {
		return number( a, b, c, rand );
	}
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		if ( len === 1 ) {
			return number( a, b, c, rand );
		}
		if ( dt === 'generic' ) {
			return array( len, a, b, c, rand );
		}
		return typedarray( len, dt, a, b, c, rand );
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			return matrix( dims, dt, a, b, c, rand );
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
	}
	return arrayarray( dims, a, b, c, rand );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

Object.defineProperty( module.exports, 'seed', {
	set: function ( newVal ) {
		if ( !isPositiveInteger( newVal ) ) {
			throw new TypeError( 'random()::invalid value. Seed property must be a positive integer. Option: `' + newVal + '`.' );
		}
		RAND = lcg( newVal );
	}
});
