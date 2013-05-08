// The structure/shell of this plugin is based on the shell provided at http://jqueryboilerplate.com

(function ($, window, document, undefined) {

	var pluginName = "aspen";
	var defaults = {
		above: undefined,
		below: undefined,
		margin: "10"
	};

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

			this.$window = $(window);
			this.$body = $("body");
			this.$el = $(this.el);
			this.borderBox = this.borderBoxIsSet();

			$(window).on("resize", function () { self.setElementHeight(); });
			this.setElementHeight();
		},

		setElementHeight: function () {
			var offsetValues = [];
			var windowHeight = this.$window.height();

			offsetValues.push((parseInt(this.$body.css("marginTop").replace("px", ""), 10) + parseInt(this.$body.css("marginBottom").replace("px", ""), 10)));
			var elPadding = this.borderBox ? 0 : (parseInt(this.$el.css("paddingTop").replace("px", ""), 10) + parseInt(this.$el.css("paddingBottom").replace("px", ""), 10));
			offsetValues.push(elPadding);
			// TODO: check for and calculate the height of the "above" option
			// TODO: check for and calculate the height of the "below" option
			// TODO: calculate margins to offset from elHeight
			var offset = offsetValues.reduce(function (a, b) {
				return a + b;
			});
			var elHeight = (windowHeight - offset);

			this.$el.css({ height: elHeight + "px" });
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
