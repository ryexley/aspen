// The structure/shell of this plugin is based on the shell provided at http://jqueryboilerplate.com

(function ($, window, document, undefined) {

	var pluginName = "aspen";
	var resizeFunction = this.pluginName + "SmartResize";
	var defaults = {};

	// embedding smartresize plugin: http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this;
			var args = arguments;

			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				}

				timeout = null;
			}

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// register the smartresize function with jQuery
	$.fn[this.resizeFunction] = function (fn) {
		return fn ? this.bind("resize", debounce(fn)) : this.trigger(resizeFunction);
	};

	// now lets get to the plugin...
	function Plugin (el, options) {
		this.el = el;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// add Array.reduce function for older browsers
	if ('function' !== typeof Array.prototype.reduce) {
	    Array.prototype.reduce = function(callback, opt_initialValue) {
	        'use strict';
	        if (null === this || 'undefined' === typeof this) {
	            // At the moment all modern browsers, that support strict mode, have
	            // native implementation of Array.prototype.reduce. For instance, IE8
	            // does not support strict mode, so this check is actually useless.
	            throw new TypeError(
	                'Array.prototype.reduce called on null or undefined');
	        }
	        if ('function' !== typeof callback) {
	            throw new TypeError(callback + ' is not a function');
	        }
	        var index, value,
	            length = this.length >>> 0,
	            isValueSet = false;
	        if (1 < arguments.length) {
	            value = opt_initialValue;
	            isValueSet = true;
	        }
	        for (index = 0; length > index; ++index) {
	            if (this.hasOwnProperty(index)) {
	                if (isValueSet) {
	                    value = callback(value, this[index], index, this);
	                } else {
	                    value = this[index];
	                    isValueSet = true;
	                }
	            }
	        }
	        if (!isValueSet) {
	            throw new TypeError('Reduce of empty array with no initial value');
	        }
	        return value;
	    };
	}

	Plugin.prototype = {

		init: function () {
			var self = this;

			this.verticalOffsetProperties = ["borderTopWidth", "paddingTop", "paddingBottom", "borderBottomWidth"];
			this.$window = $(window);
			this.$body = $("body");
			this.$el = $(this.el);
			this.$parents = $(this.el).parents();
			this.borderBox = this.borderBoxIsSet();

			this.$window[this.resizeFunction](function () { self.setElementHeight(); });
			this.setElementHeight();
		},

		setElementHeight: function () {
			var self = this;
			var offsetValues = [];
			var windowHeight = this.$window.height();

			offsetValues.push((this.cint(this.$body.css("marginTop")) + this.cint(this.$body.css("marginBottom"))));
			var elPadding = this.borderBox ? 0 : (this.cint(this.$el.css("paddingTop")) + this.cint(this.$el.css("paddingBottom")));
			offsetValues.push(elPadding);

			if (this.options.above) {
				var aboveElHeight = this.calculateOffset(this.options.above);
				offsetValues.push(aboveElHeight);
			}

			if (this.options.below) {
				var belowElHeight = this.calculateOffset(this.options.below);
				offsetValues.push(belowElHeight);
			}

			if (this.options.margin) {
				var topMargin = 0;
				var bottomMargin = 0;
				var margins = this.options.margin.split(" ");

				if (margins.length > 1) {
					topMargin = parseInt(margins[0], 10);
					bottomMargin = parseInt(margins[1], 10);
				} else {
					topMargin = parseInt(margins[0], 10);
					bottomMargin = parseInt(margins[0], 10);
				}

				offsetValues.push(topMargin);
				offsetValues.push(bottomMargin);

				this.$el.css({
					"margin-top": topMargin + "px",
					"margin-bottom": bottomMargin + "px"
				});
			}

			$.each(this.$parents, function () {
				var padding = (self.cint($(this).css("paddingTop")) + self.cint($(this).css("paddingBottom")));
				var borders = (self.cint($(this).css("borderTopWidth")) + self.cint($(this).css("borderBottomWidth")));
				offsetValues.push(padding);
				offsetValues.push(borders);
			});

			// TODO: add a "nested" option that:
			//		 allows the user to specify how many levels deep a target element is nested,
			//		 and calculate the offset of the parent elements to the specified depth
			//		 (is specified depth needed? need to think through this a bit more)

			var offsetFallback = 0;
			$.each(offsetValues, function (index, offsetValue) {
				offsetFallback += offsetValue || 0;
			});

			var offset = offsetValues.reduce(function (a, b) {
				return a + b;
			}, 0);

			var elHeight = (windowHeight - (offset || offsetFallback));

			this.$el.css({ "height": elHeight + "px" });
		},

		calculateOffset: function (above) {
			var self = this;
			var offset = 0;
			var els = above.split(" ");
			$.each(els, function (index, value) {
				offset += self.calculateElHeight(value);
			});

			return parseInt(offset, 10);
		},

		calculateElHeight: function (el) {
			var self = this;
			var $el = $(el);
			var elHeight = $el.height();
			$.each(this.verticalOffsetProperties, function (index, property) {
				elHeight += self.cint($el.css(property));
			});

			return elHeight;
		},

		borderBoxIsSet: function () {
			var isSet = false;

			$.each(this.$el.parents(), function () {
				if ($(this).css("box-sizing") === "border-box") {
					isSet = true;
					return false;
				}
			});

			return isSet;
		},

		cint: function (target) {
			return parseInt(target.replace("px", ""), 10) || 0;
		}

	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

}(jQuery, window, document));
