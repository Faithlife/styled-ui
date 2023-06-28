webpackJsonp([27],{

/***/ 1429:
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
        return {content: __webpack_require__(1485)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./stack.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./stack.md")
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

/***/ 1485:
/***/ (function(module, exports) {

module.exports = "`Stack` is a primitive layout component that can be used to evenly space vertically-stacked child elements. It behaves just like `Box`, but it also applies margins to direct children.\r\n\r\n### Example\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={[4, 6]}>\r\n\t<Box height=\"100px\" bg=\"purple2\" />\r\n\t<Box height=\"120px\" bg=\"purple2\" />\r\n\t<Stack spacing={3}>\r\n\t\t<Box height=\"100px\" bg=\"green2\" />\r\n\t\t<Box height=\"100px\" bg=\"green2\" />\r\n\t</Stack>\r\n\t<Box height=\"80px\" bg=\"purple2\" />\r\n</Stack>\r\n```\r\n\r\n### Horizontal Stacks\r\n\r\nStyled-UI currently does not provide a horizontal stack. Because most UIs are width-constrained, horizontal stacks needs to address wrapping and flexing needs, which vary significantly. (The vertical `Stack` simply spaces out block elements with `margin`, allowing content to grow and overflow/scroll vertically as needed).\r\n\r\nThere are many ways to stack content horizontally. Here are some options, depending on your specific needs.\r\n\r\n#### Grid\r\n\r\nCSS grid can be a convenient way to space out stacks of elements because the built-in `gap` support means not having to mess with margins or other spacing mechanisms. Because grid is designed to lay out... grids... this isn't a good solution when you need to wrap variable-width elements onto additional lines.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={5}>\r\n\t<Paragraph>Evenly space out equally-sized elements that flex to fill available space</Paragraph>\r\n\t<Box display=\"grid\" gridAutoFlow=\"column\" gridGap={4}>\r\n\t\t<Box height=\"50px\" bg=\"purple2\" />\r\n\t\t<Box height=\"50px\" bg=\"purple2\" />\r\n\t\t<Box height=\"50px\" bg=\"purple2\" />\r\n\t</Box>\r\n</Stack>\r\n```\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={5}>\r\n\t<Paragraph>Evenly space out elements that are sized based on content</Paragraph>\r\n\t<Box display=\"grid\" gridAutoFlow=\"column\" gridAutoColumns=\"max-content\" gridGap={4}>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">Short content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">This is some longer content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">Boop.</Box>\r\n\t</Box>\r\n</Stack>\r\n```\r\n\r\n#### Flexbox\r\n\r\nAn easy to way to switch the flow of block elements from vertical to horizontal is to create a flexbox context. Flexbox doesn't help you out much with the spacing _between_ flex items, so you'll need to leverage something like `margin` if you need that.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={5}>\r\n\t<Paragraph>Stack block elements horizontally. This won't wrap, and if you run out of horizontal space, items will flex shrink by default.</Paragraph>\r\n\t<Box display=\"flex\">\r\n\t\t<Box height=\"50px\" bg=\"blue2\">Short content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">This is some longer content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"green2\">Boop.</Box>\r\n\t</Box>\r\n</Stack>\r\n```\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={5}>\r\n\t<Paragraph>Stack block elements horizontally, but wrap when there's not enough horizontal space.</Paragraph>\r\n\t<Box display=\"flex\" flexWrap=\"wrap\" maxWidth=\"500px\">\r\n\t\t<Box height=\"50px\" bg=\"blue2\">Short content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">This is some longer content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"green2\">Boop.</Box>\r\n\t\t<Box height=\"50px\" bg=\"blue2\">Short content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">This is some longer content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"green2\">Boop.</Box>\r\n\t\t<Box height=\"50px\" bg=\"blue2\">Short content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"purple2\">This is some longer content.</Box>\r\n\t\t<Box height=\"50px\" bg=\"green2\">Boop.</Box>\r\n\t</Box>\r\n</Stack>\r\n```\r\n\r\n`margin` is a reasonable choice for applying spacing to elements in a flexbox context. You can follow the strategy used by `Stack` to create your own `HorizontalStack` with `spacing` prop that leverages theme data:\r\n\r\n```\r\nconst HorizontalStack = styled(Box)`\r\n\tdisplay: flex;\r\n\r\n\t> * + * {\r\n\t\t${system({\r\n\t\t\tspacing: {\r\n\t\t\t\tproperty: 'margin-left',\r\n\t\t\t\tscale: 'space',\r\n\t\t\t},\r\n\t\t})}\r\n\t}\r\n`;\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=27.b1f6a70f.chunk.js.map