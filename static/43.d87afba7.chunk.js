webpackJsonp([43],{

/***/ 1444:
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
        return {content: __webpack_require__(1500)};
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

/***/ 1500:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Default Date Picker Input\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDate: null }\r\n---\r\n<div>\r\n\t<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>\r\n\t<DatePickerInput\r\n\t\tdefaultSelectedDate={state.selectedDate || new Date()}\r\n\t\tonChange={(date) => setState({ selectedDate: date })}\r\n\t\tdateFunctions={dateFunctions}\r\n\t\tparseUserDateString={parseUserDateString}\r\n\t\tvalidate={() => true}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## Customized placement of Date Picker Input\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDate: null }\r\n---\r\n<div>\r\n\t<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>\r\n\t<DatePickerInput\r\n\t\tdefaultSelectedDate={state.selectedDate || new Date()}\r\n\t\tonChange={(date) => setState({ selectedDate: date })}\r\n\t\tdateFunctions={dateFunctions}\r\n\t\tparseUserDateString={parseUserDateString}\r\n\t\tvalidate={() => true}\r\n\t\tplacement={\"left-start\"}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## Custom props on Date Picker Input\r\n\r\nExtra props on the DatePicker Input will be passed to the Input. Useful for adding IDs to assign labels.\r\nAdditional config components can be used to pass props to the button and popover.\r\nChildren are also passed through to `DatePicker` to allow further customizations.\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDate: null }\r\n---\r\n<div>\r\n\t<label htmlFor=\"date-picker-input\">The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</label>\r\n\t<DatePickerInput\r\n\t\tid=\"date-picker-input\"\r\n\t\tdefaultSelectedDate={state.selectedDate || new Date()}\r\n\t\tonChange={(date) => setState({ selectedDate: date })}\r\n\t\tdateFunctions={dateFunctions}\r\n\t\tparseUserDateString={parseUserDateString}\r\n\t\tvalidate={() => true}\r\n\t>\r\n\t\t<DatePickerInput.Button color=\"green4\" />\r\n\t\t<DatePickerInput.Popover container=\"body\" placement=\"left-start\" />\r\n\t\t<DatePicker.Footer display=\"flex\" justifyContent=\"end\">\r\n\t\t\t<Button\r\n\t\t\t\tvariant=\"secondary\"\r\n\t\t\t\theight=\"22px\"\r\n\t\t\t\tonClick={() => { setState({ selectedDate: null }); }}\r\n\t\t\t>\r\n\t\t\t\tReset date\r\n\t\t\t</Button>\r\n\t\t</DatePicker.Footer>\r\n\t</DatePickerInput>\r\n</div>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=43.d87afba7.chunk.js.map