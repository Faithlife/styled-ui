webpackJsonp([53],{

/***/ 1434:
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
        return {content: __webpack_require__(1490)};
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

/***/ 1490:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\nThis documentation is automatically generated from JSDoc comments.\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Accordion} />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Accordion.Item} displayName=\"Accordion.Item\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Accordion.Header} displayName=\"Accordion.Header\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Accordion.Panel} displayName=\"Accordion.Panel\" />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=53.546e63b0.chunk.js.map