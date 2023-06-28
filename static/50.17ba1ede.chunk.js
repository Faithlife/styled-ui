webpackJsonp([50],{

/***/ 1436:
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
        return {content: __webpack_require__(1492)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./utility-button.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./utility-button.md")
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

/***/ 1492:
/***/ (function(module, exports) {

module.exports = "`UtilityButton` is a button with no standard button styling. It accepts styled-system props. Use in contexts when you need a clickable element that shouldn't _look_ like a button. e.g., search results, media grids, or complex menu items.\r\n\r\n### Sample\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<UtilityButton display=\"flex\" justifyContent=\"center\" width=\"200px\" height=\"100px\" backgroundColor=\"blue2\" onClick={() => alert('hi')}>\r\n\t<Box><Text textStyle=\"c.18\">I'm a button</Text></Box>\r\n</UtilityButton>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=50.17ba1ede.chunk.js.map