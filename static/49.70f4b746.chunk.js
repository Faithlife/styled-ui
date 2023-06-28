webpackJsonp([49],{

/***/ 1435:
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
        return {content: __webpack_require__(1491)};
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

/***/ 1491:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\nButtons allow users to command the computer to take some action. Buttons, like all standard form components, usually have 16 px space between them.\r\n\r\n## Component Variations\r\n\r\n### Variants\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" size=\"medium\">\r\n\t\tPrimary\r\n\t</Button>\r\n\t<Button variant=\"secondary\" size=\"medium\">\r\n\t\tSecondary\r\n\t</Button>\r\n\t<Button variant=\"minor\" size=\"medium\">\r\n\t\tMinor\r\n\t</Button>\r\n\t<Button variant=\"transparent\" size=\"medium\">\r\n\t\tTransparent\r\n\t</Button>\r\n\t<Button variant=\"minorTransparent\" size=\"medium\">\r\n\t\tMinor Transparent\r\n\t</Button>\r\n\t<Button variant=\"link\" size=\"medium\">\r\n\t\tLink\r\n\t</Button>\r\n\t<Button variant=\"danger\" size=\"medium\">\r\n\t\tDanger\r\n\t</Button>\r\n\t<Button variant=\"dangerSpecial\" size=\"medium\">\r\n\t\tDanger (Special)\r\n\t</Button>\r\n</ButtonDemo>\r\n```\r\n\r\n### Size\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" size=\"small\">\r\n\t\tSmall\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"medium\">\r\n\t\tMedium\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"large\">\r\n\t\tLarge\r\n\t</Button>\r\n</ButtonDemo>\r\n```\r\n\r\n### With Icon\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" size=\"large\" icon={<GearIcon />}>\r\n\t\tSettings\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"small\" icon={<GearIcon />}>\r\n\t\tSettings\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"small\" icon={<GearIcon />} />\r\n\t<Button variant=\"transparent\" size=\"small\" icon={<GearIcon />} />\r\n\t<Button variant=\"minorTransparent\" size=\"small\" icon={<GearIcon />} />\r\n</ButtonDemo>\r\n```\r\n\r\n### Responsive Sizes\r\n\r\nPass an array of sizes corresponding to breakpoints.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Button variant=\"primary\" size={['large', 'medium']}>\r\n\tGo\r\n</Button>\r\n```\r\n\r\n### Supported style customizations\r\n\r\nThis component accepts styled-system props.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" size=\"large\" backgroundColor=\"plum\">\r\n\t\tPlum\r\n\t</Button>\r\n\t<Button variant=\"primary\" size=\"large\" width=\"200px\">\r\n\t\t200px Wide\r\n\t</Button>\r\n\t<Button variant=\"primary\" textStyle=\"ui.12\" padding={3}>\r\n\t\t12px Font, 8px Padding\r\n\t</Button>\r\n</ButtonDemo>\r\n```\r\n\r\n## Disabled states\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" disabled>\r\n\t\tPrimary\r\n\t</Button>\r\n\t<Button variant=\"secondary\" size=\"medium\" disabled>\r\n\t\tSecondary\r\n\t</Button>\r\n\t<Button variant=\"minor\" size=\"medium\" disabled>\r\n\t\tMinor\r\n\t</Button>\r\n\t<Button variant=\"transparent\" size=\"medium\" disabled>\r\n\t\tTransparent\r\n\t</Button>\r\n\t<Button variant=\"link\" size=\"medium\" disabled>\r\n\t\tLink\r\n\t</Button>\r\n\t<Button variant=\"danger\" size=\"medium\" disabled>\r\n\t\tdanger\r\n\t</Button>\r\n\t<Button variant=\"dangerSpecial\" size=\"medium\" disabled>\r\n\t\tDanger (Special)\r\n\t</Button>\r\n</ButtonDemo>\r\n```\r\n\r\n## Loading prop\r\n\r\n```react\r\nshowSource: true\r\nstate: { loading: false }\r\n---\r\n<ButtonDemo>\r\n\t<Button variant=\"primary\" loading={state.loading} onClick={() => {\r\n\t\tsetState({ loading: true });\r\n\t\tsetTimeout(() => setState({ loading: false }), 1000);\r\n\t}}>\r\n\t\tPrimary\r\n\t</Button>\r\n\t<Button variant=\"secondary\" loading={state.loading} onClick={() => {\r\n\t\tsetState({ loading: true });\r\n\t\tsetTimeout(() => setState({ loading: false }), 1000);\r\n\t}}>\r\n\t\tSecondary\r\n\t</Button>\r\n\t<Button variant=\"primary\" icon={<GearIcon />} loading={state.loading} onClick={() => {\r\n\t\tsetState({ loading: true });\r\n\t\tsetTimeout(() => setState({ loading: false }), 1000);\r\n\t}}>\r\n\t\tWith Icon\r\n\t</Button>\r\n\t<Button variant=\"transparent\" icon={<GearIcon />} loading={state.loading} onClick={() => {\r\n\t\tsetState({ loading: true });\r\n\t\tsetTimeout(() => setState({ loading: false }), 1000);\r\n\t}} />\r\n</ButtonDemo>\r\n```\r\n\r\n## MultiButtons\r\n\r\nMultiButtons inside a container \"join\" together\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<Box>\r\n\t\t<MultiButton variant=\"primary\">Primary</MultiButton>\r\n\t\t<MultiButton variant=\"secondary\">Secondary</MultiButton>\r\n\t\t<MultiButton variant=\"transparent\">Transparent</MultiButton>\r\n\t</Box>\r\n</ButtonDemo>\r\n```\r\n\r\n## Button Select\r\n\r\nA common use of MultiButtons is for a \"select\" like group of buttons serving as options\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 0 }\r\n---\r\n<ButtonDemo>\r\n\t<ButtonSelect\r\n\t\tsize=\"small\"\r\n\t\ttextStyle=\"ui.14\"\r\n\t\tminWidth=\"72px\"\r\n\t\tvalue={state.value}\r\n\t\toptions={[\r\n\t\t\t{value: 0, display: \"Zero\"},\r\n\t\t\t{value: 1, display: \"One\"},\r\n\t\t\t{value: 2, display: \"Two\"},\r\n\t\t\t{value: 3, display: \"Three\", color: \"green\"},\r\n\t\t]}\r\n\t\tonChange={(value) => setState({ value })}\r\n\t/>\r\n</ButtonDemo>\r\n```\r\n\r\n## Button Groups (deprecated)\r\nPrefer using `MultiButton` or `ButtonSelect`\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<ButtonDemo>\r\n\t<SegmentedButtonGroup>\r\n\t\t<Button variant=\"transparent\" active size=\"medium\">\r\n\t\t\tPrimary\r\n\t\t</Button>\r\n\t\t<Button variant=\"transparent\" size=\"medium\">\r\n\t\t\tSecondary\r\n\t\t</Button>\r\n\t\t<Button variant=\"transparent\" size=\"medium\">\r\n\t\t\tMinor\r\n\t\t</Button>\r\n\t</SegmentedButtonGroup>\r\n</ButtonDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=49.70f4b746.chunk.js.map