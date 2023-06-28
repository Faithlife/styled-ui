webpackJsonp([8],{

/***/ 1469:
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
        return {content: __webpack_require__(1525)};
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

/***/ 1525:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Simple Toast\r\n\r\nThe toast will appear differently for mobile and desktop. Try resizing the screen and refreshing.\r\n\r\nThe toast assumes that there will only be one toast on any page. Otherwise toasts will start to cover others in render order.\r\n\r\n```react\r\nshowSource: true\r\nstate: { number: 0 }\r\n---\r\n<ToastDemo>\r\n\t<Button onClick={() => toastRef.current.showMessage({ message: 'Hello!' })}>Hello!</Button>\r\n\t<Button onClick={() => toastRef.current.showMessage({ message: 'Hello w/ Icon!', icon: <LoadingSpinner small /> })}>Hello w/ Icon!</Button>\r\n\t<SimpleToast ref={toastRef} showTime={1000} />\r\n</ToastDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=8.1daf12ca.chunk.js.map