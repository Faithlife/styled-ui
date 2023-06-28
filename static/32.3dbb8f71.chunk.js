webpackJsonp([32],{

/***/ 1423:
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
        return {content: __webpack_require__(1479)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./inferred.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./inferred.md")
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

/***/ 1479:
/***/ (function(module, exports) {

module.exports = "A text input control with a clickable inline confidence indicator.\r\n\r\n### Inferred select\r\n\r\n```react\r\n<InferredSelectFocusDemo />\r\n```\r\n\r\n### Inferred text input\r\n\r\n```react\r\n<InferredTextFocusDemo />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=32.3dbb8f71.chunk.js.map