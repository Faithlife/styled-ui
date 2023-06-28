webpackJsonp([45],{

/***/ 1440:
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
        return {content: __webpack_require__(1496)};
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

/***/ 1496:
/***/ (function(module, exports) {

module.exports = "This is a straight port of the component from [Reactstrap](https://reactstrap.github.io/components/collapse/), using only `styled-components`\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<div>\r\n\t\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen: !state.isOpen })} marginBottom={4}>Toggle</Button>\r\n\t\t<Collapse\r\n\t\t\tisOpen={state.isOpen}\r\n\t\t>\r\n\t\t\t<img src=\"https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201\" alt=\"Faithlife campus\" style={{ maxWidth: '100%' }} />\r\n\t\t</Collapse>\r\n\t</div>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=45.433831c3.chunk.js.map