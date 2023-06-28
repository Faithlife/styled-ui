webpackJsonp([19],{

/***/ 1461:
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
        return {content: __webpack_require__(1517)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./command-sentence.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./command-sentence.md")
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

/***/ 1517:
/***/ (function(module, exports) {

module.exports = "## Parameter Sentence with CommandSentence\r\n\r\nParameter sentences are made to work with [@faithlife/command-sentence-control](https://git/Logos/command-sentence-control) (git enterprise link)\r\n\r\nBelow is an example usage\r\n\r\n```code\r\nlang: jsx\r\n---\r\n<ParameterSentenceDemo>\r\n\t<ParameterSentence accessibilityFormLabel=\"Tithe Calculator\">\r\n\t\t<CommandSentence\r\n\t\t\ttemplate={'I want to give %PERCENTAGE% (%PREPOST% 19% taxes) of my %SCHEDULE% income of %INCOME%.'}\r\n\t\t>\r\n\t\t\t<CommandSentence.Field name=\"PERCENTAGE\">\r\n\t\t\t\t<ParameterSentence.Input\r\n\t\t\t\t\tdefaultValue=\"10\"\r\n\t\t\t\t\tvalue={state.percentage}\r\n\t\t\t\t\tonChange={event => setState({ percentage: event.target.value })}\r\n\t\t\t\t\tformatValue={val => `${val}%`}\r\n\t\t\t\t\twidth=\"35px\"\r\n\t\t\t\t\taccessibilityLabel={'Percent of income to tithe'}\r\n\t\t\t\t/>\r\n\t\t\t</CommandSentence.Field>\r\n\t\t\t<CommandSentence.Field name=\"PREPOST\">\r\n\t\t\t\t<ParameterSentence.Select\r\n\t\t\t\t\tselectedId={state.prepost}\r\n\t\t\t\t\tonItemSelect={item => setState({ prepost: item })}\r\n\t\t\t\t\toptions={prePostOptions}\r\n\t\t\t\t\taccessibilityLabel={'Should give tithe before or after taxes'}\r\n\t\t\t\t/>\r\n\t\t\t</CommandSentence.Field>\r\n\t\t\t<CommandSentence.Field name=\"SCHEDULE\">\r\n\t\t\t\t<ParameterSentence.Select\r\n\t\t\t\t\tselectedId={state.schedule}\r\n\t\t\t\t\tonItemSelect={item => setState({ schedule: item })}\r\n\t\t\t\t\toptions={scheduleOptions}\r\n\t\t\t\t\taccessibilityLabel={'Pay schedule of income'}\r\n\t\t\t\t/>\r\n\t\t\t</CommandSentence.Field>\r\n\t\t\t<CommandSentence.Field name=\"INCOME\">\r\n\t\t\t\t<ParameterSentence.Input\r\n\t\t\t\t\tdefaultValue=\"55700\"\r\n\t\t\t\t\tvalue={state.income}\r\n\t\t\t\t\tonChange={event => setState({ income: event.target.value })}\r\n\t\t\t\t\tformatValue={val => `$${val}`}\r\n\t\t\t\t\twidth=\"50px\"\r\n\t\t\t\t\taccessibilityLabel={'Income per pay schedule period'}\r\n\t\t\t\t/>\r\n\t\t\t</CommandSentence.Field>\r\n\t\t</CommandSentence>\r\n\t</ParameterSentence>\r\n</ParameterSentenceDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=19.14ca823c.chunk.js.map