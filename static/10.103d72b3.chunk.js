webpackJsonp([10],{

/***/ 1467:
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
        return {content: __webpack_require__(1523)};
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

/***/ 1523:
/***/ (function(module, exports) {

module.exports = "## Share Dialog with default footer\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false, shareUrl: 'https://examplecommunity.church/', message: 'Checkout our awesome church website' }\r\n---\r\n<ModalDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen: true })}>Open a modal!</Button>\r\n\t<ShareDialog\r\n\t\tisOpen={state.isOpen}\r\n\t\tshareUrl={state.shareUrl}\r\n\t\tmessage={state.message}\r\n\t\tonClose={() => setState({ isOpen: false })}\r\n\t/>\r\n</ModalDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=10.103d72b3.chunk.js.map