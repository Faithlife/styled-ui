webpackJsonp([42],{

/***/ 1443:
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
        return {content: __webpack_require__(1499)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./documentation.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./documentation.md")
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

/***/ 1499:
/***/ (function(module, exports) {

module.exports = "This documentation is automatically generated from jsdoc comments.\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={DatePicker} />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={DatePeriodPicker} />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=42.7b122fe3.chunk.js.map