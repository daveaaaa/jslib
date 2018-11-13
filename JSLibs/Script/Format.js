"use strict";

var Libs = Libs || {};

/**
 * @description Format libary
 */
Libs.Format = (function Format() {
	var _this = {};

	_this.defaultOptions = {
		decimalPlaces: 2,
		locale: "en-gb",
		currency: "GBP"
	};

	/**
	 *	@description checks to see if the input is a number - will try and parse a string
	 *	@param {number} input the number to try and parse
	 *	@return {boolean} is a number
	 */
	_this.isNumber = function isNumber(input) {
		var _isNumber = true;

		if (typeof input !== 'string' && typeof input !== 'number') {
			_isNumber = false;

		} else if (typeof input === 'string') {
			input = parseFloat(input);
			_isNumber = !isNaN(input);
		}

		return _isNumber;
	}

	/**
	 * @description gets the default decimal places if value passed in is not a number
	 * @param {number} decimalPlaces
	 * @return {number}
	 */
	_this.getDecimal = function getDecimal(decimalPlaces) {
		var _decimalPlaces;

		if (_this.isNumber(decimalPlaces)) {
			_decimalPlaces = parseInt(decimalPlaces);
		} else {
			_decimalPlaces = _this.defaultOptions.decimalPlaces;
		}

		return _decimalPlaces;
	}

	return {

		/**
		*	@description return the current default options used by lib
		*/
		GetOptions: function GetOptions() {
			var currentOptions = {};

			for (var currentOption in _this.defaultOptions) {
				currentOptions[currentOption] = _this.defaultOptions[currentOption];
			}

			return currentOptions;
		},

		/**
		 *	@description set default options for the format lib
		 *	@param {object} options the new options for the lib
		 *	@returns {object} the new format settings
		 */
		SetOptions: function SetOptions(options) {
			var newOptions = {};

			for (var currentOption in _this.defaultOptions) {
				newOptions[currentOption] = _this.defaultOptions[currentOption];
			}

			for (var newOption in options) {
				if (_this.defaultOptions[newOption] !== undefined) {
					newOptions[newOption] = options[newOption];
				}
			}

			_this.defaultOptions = newOptions;

			return newOptions;
		},

		/**
		 *	@description formats a number to be a currency string with thousands and decimal place
		 *	@param {number} input the value to be formatted
		 *	@param {number} decimalPlaces the amount of decimal places to include - if not passed in then return the default value of 2
		 *	@param {string} currency the currency to format the string to 
		 *	@returns {string} the value formatted as a string 
		 */
		NumberToCurrencyString: function NumberToCurrencyString(input, decimalPlaces, currency) {
			var returnString = "";

			if (_this.isNumber(input)) {
				input = parseFloat(input);
			} else {
				throw "Libs.Format.NumberString(input, decimalPlaces) : input is not a number"
			}

			decimalPlaces = _this.getDecimal(decimalPlaces);

			if (typeof currency !== "string") {
				currency = _this.defaultOptions.currency;
			}

			returnString = input.toLocaleString(_this.defaultOptions.locale, { style: 'currency', currency: currency, minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });

			return returnString;
		},

		/**
		 *	@description formats a number to be a stirng with thousands and decimal place
		 *	@param {number} input the value to be formatted
		 *	@param {number} decimalPlaces the amount of decimal places to include - if not passed in then return the default value of 2
		 *	@returns {string} the value formatted as a string 
		 */
		NumberToString: function NumberToString(input, decimalPlaces) {
			var returnString = "";

			if (_this.isNumber(input)) {
				input = parseFloat(input);
			} else {
				throw "Libs.Format.NumberString(input, decimalPlaces) : input is not a number"
			}

			decimalPlaces = _this.getDecimal(decimalPlaces);

			returnString = input.toLocaleString(_this.defaultOptions.locale, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });

			return returnString;
		}

	};
})()