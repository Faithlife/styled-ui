webpackJsonp([17],{

/***/ 1460:
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
        return {content: __webpack_require__(1516)};
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

/***/ 1516:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n\t<HelpBox variant=\"warning\">This documentation page was broken by the update to v6. It will be fixed shortly.</HelpBox>\r\n</React.Fragment>\r\n```\r\n\r\n## Desktop Parameter Sentence\r\n\r\nNote to designers: under the hood a parameter sentence is seen as a form by screen readers. Including a small description of each parameter as if it was a form label will go a long way towards keeping it accessible.\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tisOpen: false,\r\n\tprepost: 'after',\r\n\tschedule: 'annual',\r\n\tpercentage: 10,\r\n\tincome: 55700,\r\n}\r\n---\r\n<ParameterSentenceDemo>\r\n\t<ParameterSentence accessibilityFormLabel=\"Tithe Calculator\">\r\n\t\t{'I want to give '}\r\n\t\t<ParameterSentence.Input\r\n\t\t\tdefaultValue=\"10\"\r\n\t\t\tvalue={state.percentage}\r\n\t\t\tonChange={event => setState({ percentage: event.target.value })}\r\n\t\t\tformatValue={val => `${val}%`}\r\n\t\t\twidth=\"30px\"\r\n\t\t\taccessibilityLabel={'Percent of income to tithe'}\r\n\t\t/>\r\n\t\t{' of my '}\r\n\t\t<ParameterSentence.Select\r\n\t\t\tselectedId={state.schedule}\r\n\t\t\tonItemSelect={item => setState({ schedule: item })}\r\n\t\t\toptions={scheduleOptions}\r\n\t\t\taccessibilityLabel={'Pay schedule of income'}\r\n\t\t/>\r\n\t\t{' income'}\r\n\t</ParameterSentence>\r\n</ParameterSentenceDemo>\r\n```\r\n\r\n## Mobile ParameterSelects\r\n\r\nIf this is a mobile or touch screen device include the `useNativeSelect` prop to trigger the native select picker.\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tisOpen: false,\r\n\tprepost: 'after',\r\n\tschedule: 'annual',\r\n\tpercentage: 10,\r\n\tincome: 55700,\r\n}\r\n---\r\n<ParameterSentenceDemo>\r\n\t<ParameterSentence accessibilityFormLabel=\"Tithe Calculator\">\r\n\t\t<ParameterSentence.Select\r\n\t\t\tuseNativeSelect\r\n\t\t\tselectedId={state.schedule}\r\n\t\t\tonItemSelect={item => setState({ schedule: item })}\r\n\t\t\toptions={scheduleOptions}\r\n\t\t\taccessibilityLabel={'Pay schedule of income'}\r\n\t\t/>\r\n\t</ParameterSentence>\r\n</ParameterSentenceDemo>\r\n```\r\n\r\n## Style variations\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tisOpen: false,\r\n\tprepost: 'after',\r\n\tschedule: 'annual',\r\n\tpercentage: 10,\r\n\tincome: 55700,\r\n}\r\n---\r\n<ParameterSentenceDemo addMargin>\r\n\t<ParameterSentence.Select\r\n\t\tselectedId={state.schedule}\r\n\t\tonItemSelect={item => setState({ schedule: item })}\r\n\t\toptions={scheduleOptions}\r\n\t\taccessibilityLabel={'Pay schedule of income'}\r\n\t\tstyleOverrides={{ fontSize: '18px' }}\r\n\t/>\r\n\t<ParameterSentence.Input\r\n\t\tdefaultValue=\"10\"\r\n\t\tvalue={state.percentage}\r\n\t\tonChange={event => setState({ percentage: event.target.value })}\r\n\t\tformatValue={val => `${val}%`}\r\n\t\twidth=\"35px\"\r\n\t\taccessibilityLabel={'Percent of income to tithe'}\r\n\t\tstyleOverrides={{ fontSize: '18px' }}\r\n\t/>\r\n</ParameterSentenceDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=17.4b0262f4.chunk.js.map