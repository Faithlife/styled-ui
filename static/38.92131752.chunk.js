webpackJsonp([38],{

/***/ 1446:
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
        return {content: __webpack_require__(1502)};
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

/***/ 1502:
/***/ (function(module, exports) {

module.exports = "## Component Variations\r\n\r\nIn general, it is recommended to provide some other alternate UI on mobile .\r\n\r\n### Basic\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfileNames: [],\r\n}\r\n---\r\n<div>\r\n\t<DropZone\r\n\t\tonDrop={dropEvent => {\r\n\t\t\tdropEvent.preventDefault();\r\n\t\t\tdropEvent.stopPropagation();\r\n\r\n\t\t\tconst files = dropEvent.dataTransfer.files;\r\n\t\t\tconst fileNames = [];\r\n\t\t\tfor (const file of files) {\r\n\t\t\t\tfileNames.push(file.name);\r\n\t\t\t}\r\n\r\n\t\t\tsetState(prevState => ({\r\n\t\t\t\tfileNames: [...prevState.fileNames, ...fileNames],\r\n\t\t\t}));\r\n\t\t}}\r\n\t>\r\n\t\tDrop files\r\n\t</DropZone>\r\n\t<DroppedFiles>\r\n\t\t{state.fileNames.map((name, i) => <div key={`${name}_{i}`}>Dropped file: {name}</div>)}\r\n\t</DroppedFiles>\r\n</div>\r\n```\r\n\r\n### With more complex children\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfileNames: [],\r\n}\r\n---\r\n<div>\r\n\t<DropZone\r\n\t\tonDrop={dropEvent => {\r\n\t\t\tdropEvent.preventDefault();\r\n\t\t\tdropEvent.stopPropagation();\r\n\r\n\t\t\tconst files = dropEvent.dataTransfer.files;\r\n\t\t\tconst fileNames = [];\r\n\t\t\tfor (const file of files) {\r\n\t\t\t\tfileNames.push(file.name);\r\n\t\t\t}\r\n\r\n\t\t\tsetState(prevState => ({\r\n\t\t\t\tfileNames: [...prevState.fileNames, ...fileNames],\r\n\t\t\t}));\r\n\t\t}}\r\n\t>\r\n\t\t<IconsContainer>\r\n\t\t\t<svg\r\n\t\t\t\tstroke=\"currentColor\"\r\n\t\t\t\tfill=\"currentColor\"\r\n\t\t\t\tstrokeWidth=\"0\"\r\n\t\t\t\tviewBox=\"0 0 512 512\"\r\n\t\t\t\theight=\"28\"\r\n\t\t\t\twidth=\"28\"\r\n\t\t\t>\r\n\t\t\t\t<path d=\"M470.4 1.5l-304 96C153.1 101.7 144 114 144 128v264.6c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V220.5l272-85.9v194c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V32c0-21.7-21.1-37-41.6-30.5z\" />\r\n\t\t\t</svg>\r\n\t\t\t<svg\r\n\t\t\t\tstroke=\"currentColor\"\r\n\t\t\t\tfill=\"currentColor\"\r\n\t\t\t\tstrokeWidth=\"0\"\r\n\t\t\t\tviewBox=\"0 0 384 512\"\r\n\t\t\t\theight=\"28\"\r\n\t\t\t\twidth=\"28\"\r\n\t\t\t>\r\n\t\t\t\t<path d=\"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z\" />\r\n\t\t\t</svg>\r\n\t\t</IconsContainer>\r\n\t\t<DropZoneMessage>Drag & drop to upload chord charts, tracks, etc.</DropZoneMessage>\r\n\t</DropZone>\r\n\t<DroppedFiles>\r\n\t\t{state.fileNames.map((name, i) => <div key={`${name}_{i}`}>Dropped file: {name}</div>)}\r\n\t</DroppedFiles>\r\n</div>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=38.92131752.chunk.js.map