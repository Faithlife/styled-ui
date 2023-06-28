webpackJsonp([21],{

/***/ 1459:
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
        return {content: __webpack_require__(1515)};
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

/***/ 1515:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal} />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal.Header} displayName=\"Modal.Header\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal.Content} displayName=\"Modal.Content\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal.Footer} displayName=\"Modal.Footer\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal.FooterButtons} displayName=\"Modal.FooterButtons\" />\r\n```\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<DocgenTable component={Modal.FooterButton} displayName=\"Modal.FooterButton\" />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=21.9635f966.chunk.js.map