webpackJsonp([6],{

/***/ 1471:
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
        return {content: __webpack_require__(1527)};
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

/***/ 1527:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Slider\r\n\r\n```react\r\nshowSource: true\r\nstate: {}\r\n---\r\n<div style={{background: \"#fff\", padding: 20}}>\r\n\t<Slider value={1} stopCount={5} />\r\n\t<Slider value={1} stopCount={5} />\r\n</div>\r\n```\r\n\r\n### With minValue / maxValue\r\n\r\n```react\r\nshowSource: true\r\nstate: {}\r\n---\r\n<div style={{background: \"#fff\", padding: 20}}>\r\n\t<Slider value={2} minValue={0} maxValue={2} stopCount={5} />\r\n\t<Slider value={3} minValue={1} maxValue={3} stopCount={5} />\r\n\t<Slider value={4} minValue={2} maxValue={4} stopCount={5} />\r\n</div>\r\n```\r\n\r\n### With labels\r\n\r\n```react\r\nshowSource: true\r\nstate: {}\r\n---\r\n<div style={{background: \"#fff\", padding: 20}}>\r\n\t<Slider value={1} stopCount={5} labels={['Admins', 'Moderators', 'Members', 'Followers', 'Public']} disabled />\r\n\t<Slider value={1} stopCount={5} labels={['One', 'Two', 'Three', 'Four', 'Five']}/>\r\n\t<Slider value={1} minValue={1} maxValue={3} stopCount={5} labels={['', 'Min', '', 'Max', '']}/>\r\n</div>\r\n```\r\n\r\n### Callback props: onStop vs onSlide\r\n\r\nIf your slider will be making external API calls, you may wish to call that only on the `onStop` callback, when the user has finished sliding.\r\nIf you want to have incremental updates while the slider is moving, such as to keep multiple sliders in sync, you may want to use the `onSlide` callback prop.\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 1 }\r\n---\r\n<div style={{background: \"#fff\", padding: 20}}>\r\n\tonStop:\r\n\t<Slider\r\n\t\tvalue={state.value}\r\n\t\tstopCount={5}\r\n\t\tonStop={function (value) {setState({value: value})}}\r\n\t/>\r\n\tonSlide:\r\n\t<Slider\r\n\t\tvalue={state.value}\r\n\t\tstopCount={5}\r\n\t\tonSlide={function (value) {setState({value: value})}}\r\n\t/>\r\n</div>\r\n```\r\n\r\n### hideAvailableStops\r\n\r\nFor sliders with many stops, consider using the `hideAvailableStops` option.\r\n\r\n```react\r\nshowSource: true\r\nstate: { value: 50, labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100] }\r\n---\r\n<div style={{background: \"#fff\", padding: 20}}>\r\n\t<div>Opacity: {state.value * 2}</div>\r\n\t<Slider\r\n\t\tvalue={state.value}\r\n\t\tonStop={function (value) {setState({value: value})}}\r\n\t\tstopCount={51}\r\n\t\tlabels={state.labels}\r\n\t/>\r\n\t<Slider\r\n\t\thideAvailableStops\r\n\t\tvalue={state.value}\r\n\t\tonStop={function (value) {setState({value: value})}}\r\n\t\tstopCount={51}\r\n\t\tlabels={state.labels}\r\n\t/>\r\n\t<img src=\"https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201\" alt=\"Faithlife campus\" style={{ maxWidth: '100%', opacity: (state.value * 2) / 100 }} />\r\n</div>\r\n```\r\n\r\n### Note on background colors\r\n\r\nThe slider component expects a white background to create the sections of inactive track that cover the blue gradient. If your slider is not on a white background, use the `backgroundColor` (or `bg`) prop to indicate the correct background color.\r\n\r\n```react\r\nshowSource: true\r\nstate: {}\r\n---\r\n<div style={{background: \"#8fdb6b\", padding: 20}}>\r\n\t<Slider value={1} maxValue={3} stopCount={5} />\r\n\t<Slider backgroundColor=\"#8fdb6b\" value={1} maxValue={3} stopCount={5} />\r\n\t<Slider bg=\"#8fdb6b\" value={1} maxValue={3} stopCount={5} />\r\n</div>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=6.9fb584ce.chunk.js.map