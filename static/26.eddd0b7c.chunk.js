webpackJsonp([26],{

/***/ 1454:
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
        return {content: __webpack_require__(1510)};
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

/***/ 1510:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n\t<HelpBox variant=\"warning\">\r\n\t\tCatalog has a setState bug and the example below appears broken, but the component is functional.\r\n\t</HelpBox>\r\n</React.Fragment>\r\n```\r\n\r\nA `Listbox` is a dropdown should be used in situations similar to an HTML select. Refer to the `Menu` docs for more info on variations.\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false, selected: 0 }\r\n---\r\n<ListboxDemo>\r\n\t<Label id=\"listboxLabel\">Pick your favorite browser:</Label>\r\n\t<Listbox\r\n\t\tisOpen={state.isOpen}\r\n\t\tonItemSelect={id => {console.log(id); setState({ selected: id })}}\r\n\t\tselectedId={state.selected}\r\n\t\tonToggleMenu={() => setState({ isOpen: !state.isOpen })}\r\n\t\tlabelledBy=\"listboxLabel\"\r\n\t\twidth=\"100px\"\r\n\t>\r\n\t\t<Listbox.Toggle>{browserList[state.selected]}</Listbox.Toggle>\r\n\t\t<Listbox.Dropdown>\r\n\t\t\t{browserList.map((name, index) => <Listbox.Option id={index}>{name}</Listbox.Option>)}\r\n\t\t\t<Listbox.Option id=\"ie\" disabled>Internet Explorer</Listbox.Option>\r\n\t\t</Listbox.Dropdown>\r\n\t</Listbox>\r\n</ListboxDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=26.eddd0b7c.chunk.js.map