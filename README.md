## Aspen
This plugin is intended to help simplify the need for sizing elements on a page to use the maximum available vertical space.

#### Gotchas / known issues
* This plugin takes into account whether or not CSS `box-sizing` is set to `border-box` on any parent of the target element. If `box-sizing` is set to `border-box` then the plugin ignores the padding settings on the target element, otherwise, if its not set, or set to any other option, it accounts for the CSS padding settings on the target element when calculating vertical space. **THIS MEANS** that if you dynamically change the `box-sizing` setting of any parent element to or from `border-box`, the plugin may not be able to calculate vertical space accurately.
