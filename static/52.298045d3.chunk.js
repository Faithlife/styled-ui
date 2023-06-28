webpackJsonp([52],{

/***/ 1433:
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
        return {content: __webpack_require__(1489)};
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

/***/ 1489:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner>\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\nThese `<Accordion>` components follow the [WAI-ARIA spec for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).\r\n\r\nThis component does not directly support any options for requiring that one section always be open, or else limiting that no more than one section can be open. However, this component uses a fully-controlled pattern and this functionality could be implemented with a wrapping component in consuming code.\r\n\r\nAn `<Accordion>` can have any number of `<Accordion.Item>` children. Each `<Accordion.Item>` should have exactly one `<Accordion.Header>` and one `<Accordion.Panel>` as children.\r\n\r\n## Component Variations\r\n\r\n### With arrows\r\n\r\n```react\r\nplain: true\r\nshowSource: true\r\nstate: { expandedSections: [0] }\r\n---\r\n<AccordionDemo>\r\n\t<Accordion expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>\r\n\t\t<Accordion.Item pinned>\r\n\t\t\t<Accordion.Header subtitle=\"Subtitle for Section One.\">\r\n\t\t\t\tSection One Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Email\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header subtitle=\"This is a pretty long subtitle with some descenders.\">\r\n\t\t\t\tSection Two Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Home address\" />\r\n\t\t\t\t\t<Input small placeholder=\"Zip code\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header>\r\n\t\t\t\tSection Three Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Mother's maiden name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Name of your first pet\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t</Accordion>\r\n</AccordionDemo>\r\n```\r\n\r\n### With `hideArrows` and custom indicators\r\n\r\nFor usability, it is suggested that custom indicators have `tabindex: -1` and not be a part of the tab order.\r\n\r\n```react\r\nplain: true\r\nshowSource: true\r\nstate: { expandedSections: [0, 2] }\r\n---\r\n<AccordionDemo>\r\n\t<Accordion hideArrows expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header renderCustomIndicator={({ isExpanded, onExpansion }) => (\r\n\t\t\t\t\t<Checkbox isChecked={isExpanded} onClick={onExpansion} tabIndex={-1} />\r\n\t\t\t\t)\r\n\t\t\t}>\r\n\t\t\t\tSection One Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Email\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header>\r\n\t\t\t\tSection Two Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Home address\" />\r\n\t\t\t\t\t<Input small placeholder=\"Zip code\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header>\r\n\t\t\t\tSection Three Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Mother's maiden name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Name of your first pet\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t</Accordion>\r\n</AccordionDemo>\r\n```\r\n\r\n### With subtitles\r\n\r\nIn most cases the subtitle should be hidden on mobile viewports, but that is a responsibility of the consumer.\r\n\r\n```react\r\nplain: true\r\nshowSource: true\r\nstate: { expandedSections: [] }\r\n---\r\n<AccordionDemo>\r\n\t<Accordion expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header subtitle=\"The first book of the Bible.\">\r\n\t\t\t\tGenesis\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<div>In the beginning, God created the heavens and the earth.</div>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header subtitle=\"The second book of the Bible.\">\r\n\t\t\t\tExodus\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<div>And these are the names of the sons of Israel who came to Egypt; with Jacob, they each came with his ⌊family⌋:</div>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header subtitle=\"The third book of the Bible.\">\r\n\t\t\t\tLeviticus\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<div>Then Yahweh called to Moses and spoke to him from the tent of assembly, saying,</div>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t</Accordion>\r\n</AccordionDemo>\r\n```\r\n\r\n### minimal variant\r\n\r\n```react\r\nplain: true\r\nshowSource: true\r\nstate: { expandedSections: [0] }\r\n---\r\n<AccordionDemo>\r\n\t<Accordion variant=\"minimal\" expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>\r\n\t\t<Accordion.Item pinned>\r\n\t\t\t<Accordion.Header subtitle=\"Subtitle for Section One.\">\r\n\t\t\t\tSection One Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Email\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header>\r\n\t\t\t\tSection Two Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Home address\" />\r\n\t\t\t\t\t<Input small placeholder=\"Zip code\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t\t<Accordion.Item>\r\n\t\t\t<Accordion.Header subtitle=\"This is a really long subtitle for the section with a switch indicator.\" renderCustomIndicator={({isExpanded, onExpansion }) => (<Switch isChecked={isExpanded} onClick={onExpansion} />)}>\r\n\t\t\t\tSection Three Title\r\n\t\t\t</Accordion.Header>\r\n\t\t\t<Accordion.Panel>\r\n\t\t\t\t<Form>\r\n\t\t\t\t\t<Input small placeholder=\"Mother's maiden name\" />\r\n\t\t\t\t\t<Input small placeholder=\"Name of your first pet\" />\r\n\t\t\t\t</Form>\r\n\t\t\t</Accordion.Panel>\r\n\t\t</Accordion.Item>\r\n\t</Accordion>\r\n</AccordionDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=52.298045d3.chunk.js.map