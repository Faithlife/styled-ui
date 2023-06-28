webpackJsonp([5],{

/***/ 1473:
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
        return {content: __webpack_require__(1529)};
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

/***/ 1529:
/***/ (function(module, exports) {

module.exports = "### Default variant (switch/toggle)\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n\t<Switch\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t/>\r\n```\r\n\r\n### Binary choice\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n\t<Switch\r\n\t\tvariant=\"binaryChoice\"\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t/>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=5.1f6e9cc7.chunk.js.map