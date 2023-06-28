webpackJsonp([2],{

/***/ 1474:
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
        return {content: __webpack_require__(1530)};
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

/***/ 1530:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Component Variations\r\n\r\nA tab controller with screen reader and keyboard navigation support\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager>\r\n\t\t<Tab.List>\r\n\t\t\t<Tab>First Tab</Tab>\r\n\t\t\t<Tab>Second Tab</Tab>\r\n\t\t\t<Tab>Third Tab</Tab>\r\n\t\t\t<Tab disabled>Disabled Tab</Tab>\r\n\t\t</Tab.List>\r\n\t\t<Tab.Panels>\r\n\t\t\t<Tab.Panel>First Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Second Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Third Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Disabled Tab!</Tab.Panel>\r\n\t\t</Tab.Panels>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n\r\nSupports modal (default) and page variants\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager variant=\"page\">\r\n\t\t<Tab.List>\r\n\t\t\t<Tab>First Tab</Tab>\r\n\t\t\t<Tab>Second Tab</Tab>\r\n\t\t\t<Tab>Third Tab</Tab>\r\n\t\t\t<Tab disabled>Disabled Tab</Tab>\r\n\t\t</Tab.List>\r\n\t\t<Tab.Panels>\r\n\t\t\t<Tab.Panel>First Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Second Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Third Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Disabled Tab!</Tab.Panel>\r\n\t\t</Tab.Panels>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n\r\n### Style Variations\r\n\r\nBoth the Tab and Tab.Panel components extend the Box component and accept styled-system props.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager>\r\n\t\t<Tab.List>\r\n\t\t\t<Tab width=\"200px\">First Tab</Tab>\r\n\t\t\t<Tab disabled>Disabled Tab</Tab>\r\n\t\t\t<Tab>Third Tab</Tab>\r\n\t\t</Tab.List>\r\n\t\t<Tab.Panels>\r\n\t\t\t<Tab.Panel backgroundColor=\"gray4\" padding={5}>First Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Second Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Third Tab!</Tab.Panel>\r\n\t\t</Tab.Panels>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n\r\n### Controlled\r\n\r\n```react\r\nshowSource: true\r\nstate: { currentTab: 0 }\r\n---\r\n<TabDemo spacing={5}>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ currentTab: 0 })}>First tab</Button>\r\n\t<Paragraph>The current tab index is {state.currentTab}</Paragraph>\r\n\t<div>\r\n\t\t<Tab.Manager selectedTab={state.currentTab} onSelectedTabChange={tabIndex => setState({ currentTab: tabIndex })}>\r\n\t\t\t<Tab.List>\r\n\t\t\t\t<Tab>First Tab</Tab>\r\n\t\t\t\t<Tab>Second Tab</Tab>\r\n\t\t\t\t<Tab>Third Tab</Tab>\r\n\t\t\t</Tab.List>\r\n\t\t\t<Tab.Panels>\r\n\t\t\t\t<Tab.Panel>First Tab!</Tab.Panel>\r\n\t\t\t\t<Tab.Panel>Second Tab!</Tab.Panel>\r\n\t\t\t\t<Tab.Panel>Third Tab!</Tab.Panel>\r\n\t\t\t</Tab.Panels>\r\n\t\t</Tab.Manager>\r\n\t</div>\r\n</TabDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=2.5eaae2d1.chunk.js.map