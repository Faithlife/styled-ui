webpackJsonp([54],{

/***/ 1424:
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
        return {content: __webpack_require__(1480)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../node_modules/raw-loader/index.js!./WELCOME.md", function() {
            component.setState({
              content: require("!!../node_modules/raw-loader/index.js!./WELCOME.md")
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

/***/ 1480:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<HelpBox variant=\"success\">\r\n\t<Paragraph>\r\n\t\tStyled-UI v6.0.0 has been released!\r\n\t\t<Button as=\"a\" variant=\"link\" href=\"/styled-ui/#/upgrade-guide\" marginLeft={2}>Please check out the upgrade guide</Button>\r\n\t</Paragraph>\r\n</HelpBox>\r\n```\r\n\r\n## How to use\r\n\r\n1. Make sure a `.npmrc` file is present in your repo, which should contain something like: `@faithlife:registry=http://npm.faithlife.io`\r\n1. Run `yarn add @faithlife/styled-ui@^6.0.0`. Unlike v5, v6 should always be installed as a **direct** dependency.\r\n1. Run `yarn add --peer styled-components@^5.0.0`. Styled Components will break if more than one copy is present, and should be installed as a peer dependency if your package will be consumed by another app.\r\n1. Ship it!\r\n\r\n## Guidelines for use\r\n\r\nStyled-UI internally uses `styled-components` as its CSS-in-JS library, and makes use of `styled-system` props for referencing variables from our theme. New components added to this project should follow that same pattern.\r\n\r\nFor consumers of this library, each team has the flexibility to set their own standards for styling, whether that be with `styled-components` or another CSS-in-JS solution, or with classnames and LESS/CSS/SCSS/CSS Modules, etc.\r\n\r\nContributing guidelines can be found on [GitHub](https://github.com/Faithlife/styled-ui/#how-to-contribute).\r\n\r\n## If you are writing a library or integration\r\n\r\n- Use [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals)\r\n\r\nIf you are writing a package that will be required by someone else, you should exclude your `node_modules` from your Webpack bundle. This webpack plugin makes it easy.\r\n"

/***/ })

});
//# sourceMappingURL=54.b932d185.chunk.js.map