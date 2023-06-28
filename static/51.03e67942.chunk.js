webpackJsonp([51],{

/***/ 1437:
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
        return {content: __webpack_require__(1493)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./ok-cancel.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./ok-cancel.md")
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

/***/ 1493:
/***/ (function(module, exports) {

module.exports = "```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"secondary\" size=\"medium\" width=\"80px\">\r\n\t\tCancel\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"medium\" width=\"80px\">\r\n\t\tOK\r\n\t</Button>\r\n</ButtonDemo>\r\n```\r\n\r\nIt's common to need both a commit action (\"OK\", \"Done\", \"Save\") right next to a cancel action. Faithlife house style is:\r\n\r\n- \"Cancel\" on the left, \"OK\" on the right.\r\n- Cancel/Okay buttons go at the bottom of the dialog (or section) they govern.\r\n- This is because you read forms from top-left (start) to bottom-right (end), and we want the default action (\"OK\") at the logical end. Otherwise, people accidentally hit \"Cancel\".\r\n- If the actions govern a whole page, then they go at the top-right of the page, in line with the page headline. Again, \"OK\" at the far right.\r\n- Cancel/Okay buttons may be repeated at the bottom of a long page.\r\n- We know that other companies do this differently, and that's okay.\r\n"

/***/ })

});
//# sourceMappingURL=51.03e67942.chunk.js.map