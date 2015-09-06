'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.a] - lower limit
* @param {Number} [options.b] - upper limit
* @param {Number} [options.c] - mode
* @param {String} [options.dtype] - output data type
* @param {Number} [options.seed] - integer-valued seed
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'random()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'a' ) ) {
		opts.a = options.a;
		if ( !isNumber( opts.a ) ) {
			return new TypeError( 'random()::invalid option. `a` parameter must be a number primitive. Option: `' + opts.a + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'b' ) ) {
		opts.b = options.b;
		if ( !isNumber( opts.b ) || opts.b <= ( opts.a || 0 ) ) {
			return new TypeError( 'random()::invalid option. `b` parameter must be a number primitive greater than `a`. Option: `' + opts.b + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'c' ) ) {
		opts.c = options.c;
		if ( !isNumber( opts.c ) || opts.c < ( opts.a || 0 ) || opts.c > ( opts.b || 0 ) ) {
			return new TypeError( 'random()::invalid option. `c` parameter must be a number primitive in the interval `[a,b]`. Option: `' + opts.c + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'random()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'seed' ) ) {
		opts.seed = options.seed;
		if ( !isPositiveInteger( opts.seed ) ) {
			return new TypeError( 'random()::invalid option. Seed option must be a positive integer. Option: `' + opts.seed + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
