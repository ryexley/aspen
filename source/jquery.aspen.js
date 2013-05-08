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
