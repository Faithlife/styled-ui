webpackJsonp([40],{

/***/ 1431:
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
        return {content: __webpack_require__(1487)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./icons.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./icons.md")
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

/***/ 1487:
/***/ (function(module, exports) {

module.exports = "# Icons\r\n\r\n`import { FavoriteFilled } from '@faithlife/styled-ui/icons/18px'`\r\n\r\n## 12px Icons\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<IconGroup size={'12'} />\r\n```\r\n\r\n## 18px Icons\r\n\r\n```react\r\nnoSource: true\r\n---\r\n<IconGroup size={'18'} />\r\n```\r\n\r\n## Customizing Colors\r\n\r\nIcon components accept a `color` prop. You can either set this to a literal color value, or use `currentColor` to inherit the foreground color of the parent element. This is the recommended appraoch for changing color on hover.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Box color=\"red\">\r\n\t<FavoriteFilled color=\"currentColor\" />\r\n</Box>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=40.adc9ae3f.chunk.js.map