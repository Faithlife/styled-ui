webpackJsonp([30],{

/***/ 1422:
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
        return {content: __webpack_require__(1478)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./select.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./select.md")
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

/***/ 1478:
/***/ (function(module, exports) {

module.exports = "A typeahead control with keyboard navigation based on [React Select](https://react-select.com).\r\n\r\n### Upgrading from v5 to v6\r\n\r\n1. Import from `'@faithlife/styled-ui/text-input'` instead of `'@faithlife/styled-ui/dist/text-input-v2'`.\r\n2. `onChange` behaves a bit differently now when `isMulti` is `true`. If one or more options are selected and then later all selected options are removed, upon the removal of the last option the value passed to `onChange` will be `null`. In v5, the value passed to `onChange` in this situation would have been `[]`. See the [React Select v3 upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for more details.\r\n\r\n### Note on customizing re-exported features from ReactSelect\r\n\r\nIf you want to use the [components](https://react-select.com/components) prop of the `<Select>` component to replace or extend the components supplied by ReactSelect, it is strongly recommended that you use the components exported by the same version of ReactSelect. For your convenience, Styled-UI re-exports this object for you as `reactSelectComponents`, and all the other exports from ReactSelect in the `reactSelectFunctions` export.\r\n\r\n```code\r\nimport { Select, reactSelectComponents, reactSelectFunctions } from '@faithlife/styled-ui/text-input';\r\n```\r\n\r\n### Single select\r\n\r\n```react\r\nshowSource: true\r\nstate: { selection: '' }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection}</div>\r\n\t<Select\r\n\t\tonChange={selectedOption => setState({ selection: selectedOption ? selectedOption.value : '' })}\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tplaceholder=\"Choose a state...\"\r\n\t/>\r\n</div>\r\n```\r\n\r\n### Single select without search\r\n\r\n```react\r\nshowSource: true\r\nstate: { selection: '' }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection}</div>\r\n\t<Select\r\n\t\tonChange={selectedOption => setState({ selection: selectedOption ? selectedOption.value : '' })}\r\n\t\tisSearchable={false}\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tplaceholder=\"Choose a state...\"\r\n\t/>\r\n</div>\r\n```\r\n\r\n### Single select in a modal\r\n\r\n```react\r\nshowSource: true\r\nstate: { modal: false, selection: '' }\r\n---\r\n<div>\r\n\t<Button variant=\"primary\" size=\"medium\" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>\r\n\t<Modal\r\n\t\tisOpen={state.modal}\r\n\t\tcontainer=\"body\"\r\n\t\tonClose={() => setState({ modal: false })}\r\n\t\ttitle=\"Test\"\r\n\t\tfooterProps={{\r\n\t\t\tcancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal })},\r\n\t\t}}\r\n\t>\r\n\t\t<DemoDiv>\r\n\t\t\t<div>Current selection: {state.selection}</div>\r\n\t\t\t<Select\r\n\t\t\t\tonChange={selectedOption =>\r\n\t\t\t\t\tsetState({ selection: selectedOption ? selectedOption.value : '' })}\r\n\t\t\t\toptions={[\r\n\t\t\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t\t\t]}\r\n\t\t\t\tplaceholder=\"Choose a state...\"\r\n\t\t\t/>\r\n\t\t</DemoDiv>\r\n\t</Modal>\r\n</div>\r\n```\r\n\r\n### Multi select\r\n\r\n```react\r\nshowSource: true\r\nstate: { selection: [] }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection.join(', ')}</div>\r\n\t<Select\r\n\t\tonChange={(selectedOptions) => {\r\n\t\t\tsetState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });\r\n\t\t}}\r\n\t\tisMulti\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tplaceholder=\"Choose a state...\"\r\n\t/>\r\n</div>\r\n```\r\n\r\n### Multi select with custom entries\r\n\r\n```react\r\nshowSource: true\r\nstate: { selection: [] }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection.join(', ')}</div>\r\n\t<CreatableSelect\r\n\t\tonChange={(selectedOptions) => {\r\n\t\t\tsetState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });\r\n\t\t}}\r\n\t\tisMulti\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tplaceholder=\"Choose a state...\"\r\n\t/>\r\n</div>\r\n```\r\n\r\n### Multi select with checkbox add\r\n\r\n```react\r\nshowSource: true\r\nstate: { selection: [], pendingSelectedValues: [{value: 'Texas', label: 'Texas'}] }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection.join(', ')}</div>\r\n\t<CreatableSelect\r\n\t\tonChange={(selectedOptions) => {\r\n\t\t\tsetState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });\r\n\t\t}}\r\n\t\tisMulti\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tshowCheckboxes={true}\r\n\t\tgetIsOptionChecked={(data) => {\r\n\t\t\treturn data.value && !!state.pendingSelectedValues.find((x) => x.value === data.value);\r\n\t\t}}\r\n\t\tplaceholder=\"Choose a state...\"\r\n\t/>\r\n</div>\r\n```\r\n\r\n### Async select\r\n\r\n```react\r\nshowSource: true\r\nstate: { tags: [] }\r\n---\r\nconst fetchMovies = async query => {\r\n\tawait new Promise(resolve => setTimeout(resolve, 250));\r\n\treturn movies\r\n\t\t.map((label, value) => ({ value, label }))\r\n\t\t.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()))\r\n\t\t.slice(0, 5);\r\n};\r\n\r\n<AsyncCreatableSelect\r\n\tplaceholder=\"Search for movies\"\r\n\tisMulti\r\n\tdefaultOptions\r\n\tdebounceInterval={100}\r\n\tloadOptions={fetchMovies}\r\n/>\r\n```\r\n\r\n### Avatar Select\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Select\r\n\tcomponents={avatarComponents}\r\n\tisMulti\r\n\toptions={[\r\n\t\t{ value: \"california\", label: \"California\" },\r\n\t\t{ value: \"washington\", label: \"Washington\", avatar: \"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA\" },\r\n\t\t{ value: \"texas\", label: \"Texas\", avatar: \"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA\", \"secondaryLabel\": \"The Lonestar State\" },\r\n\t\t{ value: \"arizona\", label: \"Arizona\", avatar: \"https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg\" },\r\n\t\t{ value: \"florida\", label: \"Florida\", avatar: \"https://farm4.staticflickr.com/3495/3732163874_7677a346da_z.jpg\" },\r\n\t]}\r\n/>\r\n```\r\n\r\n### Custom Options select\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<CustomOptionsSelectDemo />\r\n```\r\n\r\n### Disabled state\r\n\r\n```react\r\nshowSource: false\r\nstate: { selection: '' }\r\n---\r\n<div>\r\n\t<div>Current selection: {state.selection}</div>\r\n\t<Select\r\n\t\tdisabled\r\n\t\toptions={[\r\n\t\t\t{ value: \"washington\", label: \"Washington\" },\r\n\t\t\t{ value: \"california\", label: \"California\" },\r\n\t\t\t{ value: \"Texas\", label: \"Texas\" }\r\n\t\t]}\r\n\t\tvalue={{ value: \"washington\", label: \"Washington\" }}\r\n\t/>\r\n</div>\r\n```"

/***/ })

});
//# sourceMappingURL=30.09df4689.chunk.js.map