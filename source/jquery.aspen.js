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
			$(window).on("resize", this.setElementHeight);
			this.setElementHeight();
		},

		setElementHeight: function () {
			this.$window = $(window);
			this.$body = $("body");
			this.$el = $(this.el);

			var windowHeight = this.$window.height();
			var bodyMargins = parseInt(this.$body.css("marginTop").replace("px", ""), 10) + parseInt(this.$body.css("marginBottom").replace("px", ""), 10);
			// TODO: Figure out how to check if box-sizing is set/defined in CSS...
			// ...if its set, we don't need to offset elPadding, but if its not, we need to
			// var elPadding = parseInt(this.$el.css("paddingTop").replace("px", ""), 10) + parseInt(this.$el.css("paddingBottom").replace("px", ""), 10);
			// TODO: check for and calculate the height of the "above" option
			// TODO: check for and calculate the height of the "below" option
			// TODO: calculate margins to offset from elHeight
			var elHeight = (windowHeight - bodyMargins);

			// TODO: This is empty on window resize...need to figure out wire up the window resize event to run this function against the target element
			console.log(this.$el);

			this.$el.css({ height: elHeight + "px" });
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
