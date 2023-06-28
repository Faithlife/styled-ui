webpackJsonp([28],{

/***/ 1428:
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
        return {content: __webpack_require__(1484)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./box.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./box.md")
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

/***/ 1484:
/***/ (function(module, exports) {

module.exports = "`Box` is a primitive layout component similar to a `div`. Layout styling can be applied directly via props, which also allows easy access to theme data.\r\n\r\n### Example\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Box display=\"flex\" height=\"100px\" boxShadow={1}>\r\n\t<Box flex={1} bg=\"blue1\" borderRight={1} />\r\n\t<Box width=\"200px\" bg=\"green1\" />\r\n</Box>\r\n```\r\n\r\n## Theming\r\n\r\nStyle prop values are theme-aware. For named theme values like color, strings values will be looked up in the theme object under that name. Numeric values can be used to reference indexed theme scales like spacing.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Box\r\n\tborder={1}\r\n\tpadding={3}\r\n\tcolor=\"teal5\"\r\n>\r\n\tI have a padding of 8px corresponding to the spacing value at index 3,with a background color of #009e74, corresponding to the theme color named \"teal5\".\r\n</Box>\r\n```\r\n\r\n### Responsive styling\r\n\r\nPass arrays of values corresponding to the styles to apply at various breakpoints.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Box\r\n\tborder={1}\r\n\tpadding={[2, 3]}\r\n\tbg={[null, 'blue1', 'purple1']}\r\n>\r\n\tI have a padding of 4px at the smallest breakpoint, and 8px at larger viewport widths. Background color is unset at the smallest breakpoint, blue1 at the medium breakpoint, and purple1 on larger viewports.\r\n</Box>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=28.e3f2a4c3.chunk.js.map