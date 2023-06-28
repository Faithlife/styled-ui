webpackJsonp([47],{

/***/ 1438:
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
        return {content: __webpack_require__(1494)};
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

/***/ 1494:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n### Default theme\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n<CheckboxDemo>\r\n\t<Checkbox\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t\ttitle=\"Click me\"\r\n\t\ttype=\"button\"\r\n\t/>\r\n</CheckboxDemo>\r\n```\r\n\r\n### Mixed value\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: 'mixed' }\r\n---\r\n<CheckboxDemo>\r\n\t<Checkbox\r\n\t\tonClick={() => setState({ isChecked: ({ [true]: false, [false]: 'mixed', mixed: true })[state.isChecked] })}\r\n\t\tisChecked={state.isChecked}\r\n\t\ttitle=\"Click me\"\r\n\t\ttype=\"button\"\r\n\t/>\r\n</CheckboxDemo>\r\n```\r\n\r\n### Custom theme\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n<CheckboxDemo>\r\n\t<ThemeProvider theme={{\r\n\t\tcolors: {\r\n\t\t\tcheckbox: { primary: 'darkslateblue', border: 'plum' }\r\n\t\t}\r\n\t}}>\r\n\t\t<Checkbox\r\n\t\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\t\tisChecked={state.isChecked}\r\n\t\t\ttitle=\"Click me\"\r\n\t\t/>\r\n\t</ThemeProvider>\r\n</CheckboxDemo>\r\n```\r\n\r\n### Custom label component\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n<CheckboxDemo>\r\n\t<Checkbox\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t\ttype=\"button\"\r\n\t>\r\n\t\t<span>No, click <b>me</b>!</span>\r\n\t</Checkbox>\r\n</CheckboxDemo>\r\n```\r\n\r\n### Disabled state\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n<CheckboxDemo>\r\n\t<Checkbox\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t\ttitle=\"Click me\"\r\n\t\ttype=\"button\"\r\n\t\tdisabled\r\n\t/>\r\n</CheckboxDemo>\r\n```\r\n\r\n### Custom box/label props\r\n\r\nExtra props on the `Checkbox` component are passed to the entire checkbox container. To pass Styled System props to just the box or just the label, use `Checkbox.Box` and/or `Checkbox.Label` config components.\r\n\r\n```react\r\nshowSource: true\r\nstate: { isChecked: false }\r\n---\r\n<CheckboxDemo>\r\n\t<Checkbox\r\n\t\tonClick={() => setState({ isChecked: !state.isChecked })}\r\n\t\tisChecked={state.isChecked}\r\n\t\ttype=\"button\"\r\n\t>\r\n\t\t<Checkbox.Box size=\"25px\" />\r\n\t\t<Checkbox.Label color=\"red\">A big box and a red label</Checkbox.Label>\r\n\t</Checkbox>\r\n</CheckboxDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=47.fef05c60.chunk.js.map