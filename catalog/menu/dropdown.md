```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
		<AriaCompliant />
	</V6Banner>
</React.Fragment>
```

## Dropdown -> Menu

"Dropdown" is an umbrella term for any component that shows a popover when clicked or hovered. The v5 Dropdown component implemented the WAI-ARIA `menu` pattern and as such has been renamed to `<Menu>` in Styled-UI v6 for role clarity.

[View the Menu docs](/menu/variations)
[View the Listbox docs](/listbox/variations)

### Menu vs Listbox

A "Listbox" has a "toggle" component which usually has some visual indication of the currently selected list item(s) which are available in a dropdown that is conditionally rendered/expanded. (In ARIA terms, a listbox does not have to use a dropdown, but the Styled-UI ones happen to)
https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox
https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html

A "Menu" has a "toggle" component, sometimes just an icon, sometimes a button with icon and text, which opens a list of buttons or links in a dropdown. A menu does not have a concept of a currently "selected" item.
https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html

These two distinct design patterns may use the same underlying primitive components, such as Dropdowns and Buttons, but benefit from having their own distinct named exports and documentation to differentiate their different uses.
