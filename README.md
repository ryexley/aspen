## Aspen
Aspen is a jQuery plugin sets the target element height to the calculated, available vertical space.

### What?

#### Background...
I've written a number of single-page applications where the requirement was for the app to have "desktop" like behavior that contained elements that needed to occupy as much vertical space as possible, but still be fluid on browser resize. Enough so, that I got tired of copy/pasting and/or re-writing the same code over and over again, so I decided to wrap it up and make it a jQuery plugin that I could use anywhere I needed this behavior.

#### How does it work?
For starters, you just apply the plugin to the desired target element:

	$("#target-element").aspen();

Yeah, pretty simple. Under the covers though, this is what's happening:

* It grabs the current height of the `window` object
* calculates the offset to subtract from that value by summing:
	* the top and bottom margins of the document body
	* the top and bottom padding of the target element _if `box-sizing` is not set to `border-box` on any parent element_
	* the calculated height of the element above the target, if specified in the `options` (see below)
	* the calculated height of the element below the target, if specified in the `options` (see below)
	* top and bottom margin values, if specified in the `options` (see below)
* the offset value is subtracted from the window height, and applied as the CSS `height` property of the target element

And thats it.

### Options
The plugin evaluates the following options:

* `above`: The selector of an element above the target element to offset the height for
* `below`: The selector of an element below the target element to offset the height for
* `margin`:

See `index.html` for usage examples

#### Gotchas / known issues
* This plugin takes into account whether or not CSS `box-sizing` is set to `border-box` on any parent of the target element. If `box-sizing` is set to `border-box` then the plugin ignores the padding settings on the target element, otherwise, if its not set, or set to any other option, it accounts for the CSS padding settings on the target element when calculating vertical space. **THIS MEANS** that if you dynamically change the `box-sizing` setting of any parent element to or from `border-box`, the plugin may not be able to calculate vertical space accurately.
