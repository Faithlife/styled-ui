webpackJsonp([34],{

/***/ 1451:
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
        return {content: __webpack_require__(1507)};
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

/***/ 1507:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Colors and Their Meaning\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={3}>\r\n\t<HelpBox variant=\"primary\" handleClose={() => true}>\r\n\t\t<HelpBox.Body>This is a helpful alert.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n\t<HelpBox variant=\"danger\" handleClose={() => true}>\r\n\t\t<HelpBox.Body>This is an error alert.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n\t<HelpBox variant=\"success\" handleClose={() => true}>\r\n\t\t<HelpBox.Body>This is a successful alert.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n\t<HelpBox variant=\"warning\" handleClose={() => true}>\r\n\t\t<HelpBox.Body>This is a cautious alert.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n\t<HelpBox variant=\"minor\" handleClose={() => true}>\r\n\t\t<HelpBox.Body>This is a minor alert.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n</Stack>\r\n```\r\n\r\n## Variations\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={3}>\r\n\t<HelpBox showLightBulb handleClose={() => true}>This is an alert with a light bulb.</HelpBox>\r\n\t<HelpBox hideIcon handleClose={() => true}>This alert has its icon hidden.</HelpBox>\r\n\t<HelpBox showRightIcon>This alert is showing its icon on both sides.</HelpBox>\r\n\t<HelpBox stacked handleClose={() => true}>\r\n\t\t<HelpBox.Body>This alert's contents are stacked.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n\t<HelpBox>\r\n\t\t<HelpBox.Body>This alert doesn't handle closing.</HelpBox.Body>\r\n\t\t<HelpBox.Footer><Button variant=\"primary\" size=\"small\">CTA</Button></HelpBox.Footer>\r\n\t</HelpBox>\r\n</Stack>\r\n```\r\n\r\n## Large Alerts\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Stack spacing={3}>\r\n\t<HelpBox large handleClose={() => true}>This is a large alert.</HelpBox>\r\n\t<HelpBox showLightBulb large handleClose={() => true}>This is a large alert with a light bulb.</HelpBox>\r\n</Stack>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=34.de780240.chunk.js.map