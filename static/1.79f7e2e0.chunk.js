webpackJsonp([1],{

/***/ 1427:
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
        return {content: __webpack_require__(1483)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./customization.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./customization.md")
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

/***/ 1483:
/***/ (function(module, exports) {

module.exports = "To customize the global theme, use the `ThemeProvider` wrapper component.\r\n\r\nThis documentation is automatically generated from JSDoc comments.\r\n\r\n```react\r\n<DocgenTable component={ThemeProvider} />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=1.79f7e2e0.chunk.js.map