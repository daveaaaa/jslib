"use strict";

var Libs = Libs || {};

/**
 *	@description makes a deep clone of the passed in object
 *	@param {object} input the object to clone
 *	@return {object} a deep clone of the object
 */
Libs.Clone = function Clone(input) {
	var _clone = {};

	if (typeof input !== 'object') {
		throw "Libs.Clone() input is not an object";
	}

	for (var prop in input) {

		if (input.hasOwnProperty(prop)) {
			if (typeof prop === "object") {
				_clone[prop] = Clone(input[prop]);

			} else if (typeof prop === "string" || typeof prop === "number") {
				_clone[prop] = input[prop];

			}
		}
	}

	return _clone;
};