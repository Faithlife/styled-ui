webpackJsonp([24],{

/***/ 1455:
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
        return {content: __webpack_require__(1511)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./variations.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./variations.md")
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

/***/ 1511:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n### Default size\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<LoadingSpinner />\r\n```\r\n\r\n### Small\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<LoadingSpinner variant=\"small\" />\r\n```\r\n\r\n### Medium\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<LoadingSpinner variant=\"medium\" />\r\n```\r\n\r\n### Medium with Custom Dimensions\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<LoadingSpinner variant=\"medium\" size={80} />\r\n```\r\n\r\n### Large\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<LoadingSpinner variant=\"large\" />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=24.4485095f.chunk.js.map