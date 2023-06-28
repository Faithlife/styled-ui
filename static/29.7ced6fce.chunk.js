webpackJsonp([29],{

/***/ 1430:
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
        return {content: __webpack_require__(1486)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./Text.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./Text.md")
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

/***/ 1486:
/***/ (function(module, exports) {

module.exports = "`Text` is a primitive layout component that can be used to style text with a predefined typographical style and to customize typography-related styling. By default, it renders as a `span`. `Paragraph` is also available for block text, and has the same API as `Text`.\r\n\r\n### Example\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Text textStyle=\"c.16\" whiteSpace=\"pre-wrap\">Text content using the <Text color=\"purple4\" fontWeight=\"semibold\">c.16</Text> text style.</Text>\r\n```\r\n\r\n### Available text styles\r\n\r\n#### Headings\r\n\r\nUse for headlines.\r\n\r\n```react\r\n<Stack spacing={3}>\r\n\t<ThemeList items={theme => theme.textStyles.h} render={([key, value]) => <Box  key={`h.${key}`}><Paragraph textStyle={`h.${key}`}>h.{key}</Paragraph></Box>} />\r\n</Stack>\r\n```\r\n\r\nThe `Heading` component is also available for convenience. It's a simple wrapper around `Parargaph`, rendering a `heading` element by default. Pass a `level` prop corresponding to the named `h.{level}` names listed above.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Heading level={18}>My Heading</Heading>\r\n```\r\n\r\n#### Content\r\n\r\nUse for body copy and miscellaneous content.\r\n\r\n```react\r\n<Stack spacing={3}>\r\n\t<ThemeList items={theme => theme.textStyles.c} render={([key, value]) => <Box  key={`c.${key}`}><Paragraph textStyle={`c.${key}`}>c.{key}</Paragraph></Box>} />\r\n</Stack>\r\n```\r\n\r\n#### UI\r\n\r\nUI components like buttons. Line heights always match the font size to simplify spacing.\r\n\r\n```react\r\n<Stack spacing={3}>\r\n\t<ThemeList items={theme => theme.textStyles.ui} render={([key, value]) => <Box  key={`ui.${key}`}><Paragraph textStyle={`ui.${key}`}>ui.{key}</Paragraph></Box>} />\r\n</Stack>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=29.7ced6fce.chunk.js.map