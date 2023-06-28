webpackJsonp([3],{

/***/ 1475:
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
        return {content: __webpack_require__(1531)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./sequenced-tabs.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./sequenced-tabs.md")
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

/***/ 1531:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n### Sequenced Tab Navigation\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager>\r\n\t\t<SequencedTab.List>\r\n\t\t\t<SequencedTab>First Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Second Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Third Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Fourth Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Fifth Tab, Text is Wrapped</SequencedTab>\r\n\t\t</SequencedTab.List>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n\r\n### With Associated Tab Content\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager>\r\n\t\t<SequencedTab.List>\r\n\t\t\t<SequencedTab>First Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Second Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Third Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Fourth Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Fifth Tab</SequencedTab>\r\n\t\t</SequencedTab.List>\r\n\t\t<Tab.Panels>\r\n\t\t\t<Tab.Panel>First Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Second Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Third Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Fourth Tab!</Tab.Panel>\r\n\t\t\t<Tab.Panel>Fifth Tab!</Tab.Panel>\r\n\t\t</Tab.Panels>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n\r\n### Using Disabled and Completed Flags\r\n\r\nA tab with `completed` set should not be skipped.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<TabDemo>\r\n\t<Tab.Manager>\r\n\t\t<SequencedTab.List>\r\n\t\t\t<SequencedTab>First Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Second Tab</SequencedTab>\r\n\t\t\t<SequencedTab disabled>Third Tab</SequencedTab>\r\n\t\t\t<SequencedTab completed>Fourth Tab</SequencedTab>\r\n\t\t\t<SequencedTab>Fifth Tab</SequencedTab>\r\n\t\t</SequencedTab.List>\r\n\t</Tab.Manager>\r\n</TabDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=3.5b639b1c.chunk.js.map