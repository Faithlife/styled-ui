webpackJsonp([31],{

/***/ 1421:
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
        return {content: __webpack_require__(1477)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./input.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./input.md")
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

/***/ 1477:
/***/ (function(module, exports) {

module.exports = "### Small\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<InputSpacer>\r\n\t<Input variant=\"small\" value={state.value} onChange={event => setState({ value: event.target.value })} />\r\n\t<Button variant=\"primary\" size=\"small\">Search</Button>\r\n</InputSpacer>\r\n```\r\n\r\n### Medium\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<InputSpacer>\r\n\t<Input variant=\"medium\" value={state.value} onChange={event => setState({ value: event.target.value })} />\r\n\t<Button variant=\"primary\" size=\"medium\">Search</Button>\r\n</InputSpacer>\r\n```\r\n\r\n### Large\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<InputSpacer>\r\n\t<Input variant=\"large\" value={state.value} onChange={event => setState({ value: event.target.value })} />\r\n\t<Button variant=\"primary\" size=\"large\">Search</Button>\r\n</InputSpacer>\r\n```\r\n\r\n### Responsive\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<InputSpacer>\r\n\t<Input variant={['medium', 'small']} value={state.value} onChange={event => setState({ value: event.target.value })} />\r\n\t<Button variant=\"primary\" size={['medium', 'small']}>Search</Button>\r\n</InputSpacer>\r\n```\r\n\r\n### Textarea\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: '' }\r\n---\r\n<InputSpacer>\r\n\t<Input textarea placeholder='My favorite state is...' value={state.value} onChange={event => setState({ value: event.target.value })} resize=\"horizontal\" height=\"120px\" width=\"280px\" />\r\n\t<Button variant=\"primary\" size=\"small\">Search</Button>\r\n</InputSpacer>\r\n```\r\n\r\n## FilterInput\r\n\r\nUse in UI that needs to inline-filter a list.\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<FilterInput variant=\"medium\" placeholder=\"Find\" value={state.value} onChange={event => setState({ value: event.target.value })} onClear={() => setState({ value: '' })} />\r\n```\r\n\r\n## NumberInput\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 42 }\r\n---\r\n<InputSpacer>\r\n\t<InputSpacer>\r\n\t\t<NumberInput variant=\"small\" value={state.value} onChange={event => setState({ value: event.target.value })} min={0} max={100} />\r\n\t</InputSpacer>\r\n\r\n\t<InputSpacer>\r\n\t\t<NumberInput variant=\"medium\" value={state.value} onChange={event => setState({ value: event.target.value })} min={0} max={100} />\r\n\t</InputSpacer>\r\n</InputSpacer>\r\n\r\n```\r\n\r\n## Select on Focus\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 'Washington' }\r\n---\r\n<Input selectOnFocus placeholder='My favorite state is...' value={state.value} onChange={event => setState({ value: event.target.value })} />\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=31.4ee53744.chunk.js.map