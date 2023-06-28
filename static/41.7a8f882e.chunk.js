webpackJsonp([41],{

/***/ 1442:
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
        return {content: __webpack_require__(1498)};
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

/***/ 1498:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner />\r\n</React.Fragment>\r\n```\r\n\r\n## Default Date Picker\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDate: null }\r\n---\r\n<DatePickerDemo>\r\n\t<div>\r\n\t\t<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>\r\n\t\t<Button ref={refs[0]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>\r\n\t\t{state.isOpen && (\r\n\t\t\t<Popover reference={refs[0].current} placement=\"bottom\" styleOverrides={{ maxWidth: '1000px' }} onFocusAway={() => setState({ isOpen: false })}>\r\n\t\t\t\t<DatePicker\r\n\t\t\t\t\tselectedDate={state.selectedDate}\r\n\t\t\t\t\tsetSelectedDate={(date) => setState({ selectedDate: date })}\r\n\t\t\t\t\tdateFunctions={dateFunctions}\r\n\t\t\t\t\tvalidate={() => true}\r\n\t\t\t\t>\r\n\t\t\t\t\t<DatePicker.Footer display=\"flex\" justifyContent=\"end\">\r\n\t\t\t\t\t\t<Button\r\n\t\t\t\t\t\t\tvariant=\"secondary\"\r\n\t\t\t\t\t\t\theight=\"22px\"\r\n\t\t\t\t\t\t\tonClick={() => { setState({ selectedDate: null }); }}\r\n\t\t\t\t\t\t>\r\n\t\t\t\t\t\t\tReset date\r\n\t\t\t\t\t\t</Button>\r\n\t\t\t\t\t</DatePicker.Footer>\r\n\t\t\t\t</DatePicker>\r\n\t\t\t</Popover>\r\n\t\t)}\r\n\t</div>\r\n</DatePickerDemo>\r\n```\r\n\r\n## With Min and Max Dates\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDate: null }\r\n---\r\n<DatePickerDemo>\r\n\t<div>\r\n\t\t<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>\r\n\t\t<Button ref={refs[1]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>\r\n\t\t\t{state.isOpen && (\r\n\t\t\t\t<Popover reference={refs[1].current} placement=\"bottom\" styleOverrides={{ maxWidth: '1000px' }} onFocusAway={() => setState({ isOpen: false })}>\r\n\t\t\t\t\t<DatePicker\r\n\t\t\t\t\t\tselectedDate={state.selectedDate}\r\n\t\t\t\t\t\tminDate={new Date(today.getTime()).setMonth(today.getMonth() - 2)}\r\n\t\t\t\t\t\tmaxDate={new Date(today.getTime()).setMonth(today.getMonth() + 2)}\r\n\t\t\t\t\t\tsetSelectedDate={(date) => setState({ selectedDate: date })}\r\n\t\t\t\t\t\tdateFunctions={dateFunctions}\r\n\t\t\t\t\t\tvalidate={() => true}\r\n\t\t\t\t\t/>\r\n\t\t\t\t</Popover>\r\n\t\t\t)}\r\n\t</div>\r\n</DatePickerDemo>\r\n```\r\n\r\n## Default Date Range Picker\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDateRange: null }\r\n---\r\n<DatePickerDemo>\r\n\t<div>\r\n\t\t<span>The selected date range is {(state.selectedDateRange && state.selectedDateRange.start ? dateFunctions.format(state.selectedDateRange.start, 'MM-dd-yyyy') : null)} to {(state.selectedDateRange && state.selectedDateRange.end ? dateFunctions.format(state.selectedDateRange.end, 'MM-dd-yyyy') : null)}</span>\r\n\t\t\t<Button ref={refs[2]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Dates</Button>\r\n\t\t\t{state.isOpen && (\r\n\t\t\t\t<Popover reference={refs[2].current} placement=\"bottom\" styleOverrides={{ maxWidth: '1000px' }} onFocusAway={() => setState({ isOpen: false })}>\r\n\t\t\t\t\t<DatePicker\r\n\t\t\t\t\t\tselectedDateRange={state.selectedDateRange}\r\n\t\t\t\t\t\tsetSelectedDate={(dateRange) => setState({ selectedDateRange: dateRange })}\r\n\t\t\t\t\t\tdateFunctions={dateFunctions}\r\n\t\t\t\t\t\tvalidate={() => true}\r\n\t\t\t\t\t\tasDateRangePicker\r\n\t\t\t\t\t/>\r\n\t\t\t\t</Popover>\r\n\t\t\t)}\r\n\t</div>\r\n</DatePickerDemo>\r\n```\r\n\r\n## Date Period Picker\r\n\r\n```react\r\nshowSource: true\r\nstate: { selectedDateRange: null, selectedDatePeriodIndex: null }\r\n---\r\n<DatePickerDemo>\r\n\t<div>The selected date range is {(state.selectedDateRange && state.selectedDateRange.start ? dateFunctions.format(state.selectedDateRange.start, 'MM-dd-yyyy') : null)} to {(state.selectedDateRange && state.selectedDateRange.end ? dateFunctions.format(state.selectedDateRange.end, 'MM-dd-yyyy') : null)}</div>\r\n\t<div>The selected date period index is <code>{state.selectedDatePeriodIndex === null ? \"null\" : state.selectedDatePeriodIndex}</code></div>\r\n\t<Button ref={refs[3]} onClick={() => setState({ isOpen: !state.isOpen })} style={{ margin: \"0.5rem 4rem\" }}>Select Dates</Button>\r\n\t{state.isOpen && (\r\n\t\t<Popover reference={refs[3].current} placement=\"bottom\" styleOverrides={{ padding: '0px', maxWidth: '1000px' }} onFocusAway={() => setState({ isOpen: false })}>\r\n\t\t\t<DatePeriodPicker\r\n\t\t\t\tselectedDateRange={state.selectedDateRange}\r\n\t\t\t\tsetSelectedDate={(dateRange, periodIndex) => {\r\n\t\t\t\t\tsetState({ selectedDateRange: dateRange, selectedDatePeriodIndex: periodIndex })\r\n\t\t\t\t}}\r\n\t\t\t\tdateFunctions={dateFunctions}\r\n\t\t\t\tvalidate={date => date >= new Date(1970, 0, 1)}\r\n\t\t\t\tparseDate={dateFunctions.parse}\r\n\t\t\t\tdatePeriods={[{\r\n\t\t\t\t\tdisplayName: 'Last 7 Days',\r\n\t\t\t\t\tdateRange: { start: dateFunctions.addDays(new Date(), -7), end: new Date() }\r\n\t\t\t\t},{\r\n\t\t\t\t\tdisplayName: 'Last 30 Days',\r\n\t\t\t\t\tdateRange: { start: dateFunctions.addDays(new Date(), -30), end: new Date() }\r\n\t\t\t\t},{\r\n\t\t\t\t\tdisplayName: 'Last 90 Days',\r\n\t\t\t\t\tdateRange: { start: dateFunctions.addDays(new Date(), -90), end: new Date() }\r\n\t\t\t\t}]}\r\n\t\t\t/>\r\n\t\t</Popover>\r\n\t)}\r\n</DatePickerDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=41.7a8f882e.chunk.js.map