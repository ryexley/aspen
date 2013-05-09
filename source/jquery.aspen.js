// The structure/shell of this plugin is based on the shell provided at http://jqueryboilerplate.com

(function ($, window, document, undefined) {

	var pluginName = "aspen";
	var resizeFunction = this.pluginName + "SmartResize";
	var defaults = {
		above: undefined,
		below: undefined,
		margin: "10"
	};

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

			offsetValues.push((parseInt(this.$body.css("marginTop").replace("px", ""), 10) + parseInt(this.$body.css("marginBottom").replace("px", ""), 10)));
			var elPadding = this.borderBox ? 0 : (parseInt(this.$el.css("paddingTop").replace("px", ""), 10) + parseInt(this.$el.css("paddingBottom").replace("px", ""), 10));
			offsetValues.push(elPadding);

			if (this.options.above) {
				var aboveElHeight = this.calculateElHeight(this.options.above);
				offsetValues.push(aboveElHeight);
			}

			if (this.options.below) {
				var belowElHeight = this.calculateElHeight(this.options.below);
				offsetValues.push(belowElHeight);
			}

			// TODO: calculate margins to offset from elHeight

			$.each(this.$parents, function () {
				var padding = (parseInt($(this).css("paddingTop").replace("px", ""), 10) + parseInt($(this).css("paddingBottom").replace("px", ""), 10));
				offsetValues.push(padding);
			});

			var offset = offsetValues.reduce(function (a, b) {
				return a + b;
			});
			var elHeight = (windowHeight - offset);

			this.$el.css({ height: elHeight + "px" });
		},

		calculateElHeight: function (el) {
			var $el = $(el);
			var elHeight = $el.height();
			$.each(this.verticalOffsetProperties, function () {
				elHeight += parseInt($el.css(this).replace("px", ""), 10);
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
