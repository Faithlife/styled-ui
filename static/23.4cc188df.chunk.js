webpackJsonp([23],{

/***/ 1448:
/***/ (function(module, exports, __webpack_require__) {


    var React = __webpack_require__(1);
    var createReactClass = __webpack_require__(76);
    var PageRenderer = __webpack_require__(331).PageRenderer;
    if (PageRenderer.__esModule) {
      PageRenderer = PageRenderer.default;
    }
    var WrappedPageRenderer = createReactClass({
      displayName: 'WrappedPageRenderer',
      getInitialState: function() {
        return {content: __webpack_require__(1504)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./dropdown.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./dropdown.md")
            })
          })
        }
      },
      render: function() {
        return React.createElement(PageRenderer, Object.assign({}, this.props, {content: this.state.content}));
      }
    });
    WrappedPageRenderer.__catalog_loader__ = true;
    module.exports = WrappedPageRenderer;
  

/***/ }),

/***/ 1504:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Dropdown -> Menu\r\n\r\n\"Dropdown\" is an umbrella term for any component that shows a popover when clicked or hovered. The v5 Dropdown component implemented the WAI-ARIA `menu` pattern and as such has been renamed to `<Menu>` in Styled-UI v6 for role clarity.\r\n\r\n[View the Menu docs](/menu/variations)\r\n[View the Listbox docs](/listbox/variations)\r\n\r\n### Menu vs Listbox\r\n\r\nA \"Listbox\" has a \"toggle\" component which usually has some visual indication of the currently selected list item(s) which are available in a dropdown that is conditionally rendered/expanded. (In ARIA terms, a listbox does not have to use a dropdown, but the Styled-UI ones happen to)\r\nhttps://www.w3.org/TR/wai-aria-practices-1.1/#Listbox\r\nhttps://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html\r\n\r\nA \"Menu\" has a \"toggle\" component, sometimes just an icon, sometimes a button with icon and text, which opens a list of buttons or links in a dropdown. A menu does not have a concept of a currently \"selected\" item.\r\nhttps://www.w3.org/TR/wai-aria-practices-1.1/#menubutton\r\nhttps://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html\r\n\r\nThese two distinct design patterns may use the same underlying primitive components, such as Dropdowns and Buttons, but benefit from having their own distinct named exports and documentation to differentiate their different uses.\r\n"

/***/ })

});
//# sourceMappingURL=23.4cc188df.chunk.js.map