webpackJsonp([15],{

/***/ 1463:
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
        return {content: __webpack_require__(1519)};
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

/***/ 1519:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n## Popover\r\n\r\nonFocusAway should always be used according to the spec.\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<PopoverDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[0]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen && (\r\n\t\t<Popover reference={refs[0].current} placement=\"top\" onFocusAway={() => setState({ isOpen: false })}>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n</PopoverDemo>\r\n```\r\n\r\n## Placement\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen1: false, isOpen2: false, isOpen3: false, isOpen4: false }\r\n---\r\n<PopoverDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[1]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen1 && (\r\n\t\t<Popover reference={refs[1].current} placement=\"top\" onFocusAway={() => setState({ isOpen1: false })}>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[2]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen2 && (\r\n\t\t<Popover reference={refs[2].current} placement=\"bottom\" onFocusAway={() => setState({ isOpen2: false })}>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen3: !state.isOpen3 })} ref={refs[3]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen3 && (\r\n\t\t<Popover reference={refs[3].current} placement=\"left\" onFocusAway={() => setState({ isOpen3: false })}>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen4: !state.isOpen4 })} ref={refs[4]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen4 && (\r\n\t\t<Popover reference={refs[4].current} placement=\"right\" onFocusAway={() => setState({ isOpen4: false })}>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n</PopoverDemo>\r\n```\r\n\r\n## Options\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen1: false, isOpen2: false, isOpen3: false }\r\n---\r\n<PopoverDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[5]}>\r\n\t\tShow a blue Popover!\r\n\t</Button>\r\n\t{state.isOpen1 && (\r\n\t\t<Popover\r\n\t\t\treference={refs[5].current}\r\n\t\t\tplacement=\"top\"\r\n\t\t\tonFocusAway={() => setState({ isOpen1: false })}\r\n\t\t\tbackgroundColor=\"#ebf7ff\"\r\n\t\t>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[6]}>\r\n\t\tShow a Popover with multiple custom styles!\r\n\t</Button>\r\n\t{state.isOpen2 && (\r\n\t\t<Popover\r\n\t\t\treference={refs[6].current}\r\n\t\t\tplacement=\"top\"\r\n\t\t\tonFocusAway={() => setState({ isOpen2: false })}\r\n\t\t\tboxShadow=\"\"\r\n\t\t\tpadding=\"18px\"\r\n\t\t\twidth=\"200px\"\r\n\t\t\tborder=\"black solid 1px\"\r\n\t\t\tzIndex={10}\r\n\t\t>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen3: !state.isOpen3 })} ref={refs[7]}>\r\n\t\tShow a Popover without an arrow!\r\n\t</Button>\r\n\t{state.isOpen3 && (\r\n\t\t<Popover\r\n\t\t\treference={refs[7].current}\r\n\t\t\tplacement=\"top\"\r\n\t\t\tonFocusAway={() => setState({ isOpen3: false })}\r\n\t\t\thideArrow\r\n\t\t>\r\n\t\t\tHello!\r\n\t\t</Popover>\r\n\t)}\r\n</PopoverDemo>\r\n```\r\n\r\n## Using container prop\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen1: false, isOpen2 }\r\n---\r\n// overflow: hidden\r\n<PopoverOverflowDemo>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[8]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen1 && (\r\n\t\t<Popover reference={refs[8].current} placement=\"top\" onFocusAway={() => setState({ isOpen1: false })}>\r\n\t\t\tI'm inline\r\n\t\t</Popover>\r\n\t)}\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[9]}>\r\n\t\tShow a Popover!\r\n\t</Button>\r\n\t{state.isOpen2 && (\r\n\t\t<Popover\r\n\t\t\treference={refs[9].current}\r\n\t\t\tplacement=\"top\"\r\n\t\t\tcontainer=\"body\"\r\n\t\t\tonFocusAway={() => setState({ isOpen2: false })}\r\n\t\t>\r\n\t\t\tI'm thinking with portals!\r\n\t\t</Popover>\r\n\t)}\r\n</PopoverOverflowDemo>\r\n```\r\n\r\n## Tooltip\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<PopoverDemo>\r\n\t<Tooltip content=\"hovered!\">\r\n\t\tHover me!\r\n\t</Tooltip>\r\n\t<Tooltip delay={1000} content=\"delayed!\">\r\n\t\tNo, Hover me!\r\n\t</Tooltip>\r\n</PopoverDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=15.d76856dc.chunk.js.map