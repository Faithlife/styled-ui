webpackJsonp([0],{

/***/ 1426:
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
        return {content: __webpack_require__(1482)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./usage.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./usage.md")
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

/***/ 1482:
/***/ (function(module, exports) {

module.exports = "Styled-UI includes a [Styled Components](https://www.styled-components.com/docs/advanced#theming) theme object. The theme is designed to work with [Styled System](https://styled-system.com/theme-specification). Most components accept theme-aware style props that can be used to easily access theme data. When possible, prefer to reference the theme rather than hard code specific color codes, pixel values, font families, etc.\r\n\r\n## Spacing scale\r\n\r\nUse:\r\n`<Box paddingX={3}>`\r\n\r\n```react\r\n<Box display=\"flex\">\r\n\t<ThemeList\r\n\t\titems={theme => theme.space}\r\n\t\trender={([key, value], i) => (\r\n\t\t\t<Box\r\n\t\t\t\tkey={key}\r\n\t\t\t\tmargin={3}\r\n\t\t\t\twidth={50}\r\n\t\t\t\tdisplay=\"flex\"\r\n\t\t\t\tflexDirection=\"column\"\r\n\t\t\t\talignItems=\"stretch\"\r\n\t\t\t>\r\n\t\t\t\t<Paragraph textAlign=\"center\">{key}</Paragraph>\r\n\t\t\t\t<Box height={value} backgroundColor=\"gray66\" />\r\n\t\t\t\t<Paragraph textAlign=\"center\">{value}</Paragraph>\r\n\t\t\t</Box>\r\n\t\t)}\r\n\t/>\r\n</Box>\r\n```\r\n\r\n## Color scale\r\n\r\nUse:\r\n`<Box backgroundColor=\"blue2\">`\r\n\r\n```react\r\n<Box display=\"flex\" flexWrap=\"wrap\">\r\n\t<ThemeList\r\n\t\titems={theme => theme.colors}\r\n\t\trender={([key, value], i) =>\r\n\t\t\ttypeof value === 'string' && (\r\n\t\t\t\t<Box\r\n\t\t\t\t\tkey={key}\r\n\t\t\t\t\twidth={100}\r\n\t\t\t\t\theight={100}\r\n\t\t\t\t\tmargin={4}\r\n\t\t\t\t\tdisplay=\"flex\"\r\n\t\t\t\t\tflexDirection=\"column\"\r\n\t\t\t\t\talignItems=\"stretch\"\r\n\t\t\t\t\tjustifyContent=\"center\"\r\n\t\t\t\t>\r\n\t\t\t\t\t<Paragraph textAlign=\"center\">{key}</Paragraph>\r\n\t\t\t\t\t<Box height=\"30%\" marginY={2} border={1} backgroundColor={value} />\r\n\t\t\t\t\t<Paragraph textAlign=\"center\">{value}</Paragraph>\r\n\t\t\t\t</Box>\r\n\t\t\t)\r\n\t\t}\r\n\t/>\r\n</Box>\r\n```\r\n\r\n## Full default Styled UI theme object\r\n\r\n```react\r\n<Stack spacing={4}>\r\n\t<ThemeList\r\n\t\titems={theme => theme}\r\n\t\trender={([key, value], i) => (\r\n\t\t\t<Box>\r\n\t\t\t\t<Heading level={18}>{key}</Heading>\r\n\t\t\t\t<Paragraph whiteSpace=\"pre\">{JSON.stringify(value, null, 4)}</Paragraph>\r\n\t\t\t</Box>\r\n\t\t)}\r\n\t/>\r\n</Stack>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=0.4ffb9277.chunk.js.map