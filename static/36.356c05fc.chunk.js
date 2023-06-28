webpackJsonp([36],{

/***/ 1449:
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
        return {content: __webpack_require__(1505)};
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

/***/ 1505:
/***/ (function(module, exports) {

module.exports = "## Component Variations\r\n\r\n### With Drop Target\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'File one',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'File two',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'File three',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection\r\n\t\tfiles={state.files}\r\n\t\tonFileClicked={file => console.log(file)}\r\n\t\tonUploadFiles={event => {\r\n\t\t\tevent.stopPropagation();\r\n\t\t\tevent.preventDefault();\r\n\r\n\t\t\tconst files =\r\n\t\t\t\t(event.dataTransfer && event.dataTransfer.files) ||\r\n\t\t\t\t(event.target && event.target.files);\r\n\r\n\t\t\tconst mappedFiles = [];\r\n\t\t\tfor (const file of files) {\r\n\t\t\t\tmappedFiles.push({\r\n\t\t\t\t\tid: file.name,\r\n\t\t\t\t\tname: file.name,\r\n\t\t\t\t\tbyteCount: file.size,\r\n\t\t\t\t\tmediaType: file.type,\r\n\t\t\t\t});\r\n\t\t\t}\r\n\r\n\t\t\tsetState(prevState => ({\r\n\t\t\t\tfiles: [...prevState.files, ...mappedFiles],\r\n\t\t\t}));\r\n\t\t}}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## With file actions\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'File one',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'File two',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'File three',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection\r\n\t\tfiles={state.files}\r\n\t\tonFileClicked={file => console.log(file)}\r\n\t\trenderFileActions={file => (\r\n\t\t\t<div style={{ paddingTop: 4 }}>\r\n\t\t\t\t{file.mediaType.startsWith('image') && (\r\n\t\t\t\t\t<span style={{ padding: '0 16px 0 0' }}>\r\n\t\t\t\t\t\t<Button onClick={() => console.log('Print file', file)} title=\"Print\" variant=\"primaryTransparent\">\r\n\t\t\t\t\t\t\t<svg stroke=\"currentColor\" fill=\"none\" strokeWidth=\"2\" viewBox=\"0 0 24 24\" strokeLinecap=\"round\" strokeLinejoin=\"round\" height=\"18\" width=\"18\"><polyline points=\"6 9 6 2 18 2 18 9\" /><path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" /><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" /></svg>\r\n\t\t\t\t\t\t</Button>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t)}\r\n\t\t\t\t<Button onClick={() => console.log('Download file', file)} title=\"Download\" variant=\"primaryTransparent\">\r\n\t\t\t\t\t<svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\"><g stroke=\"none\" strokeWidth=\"1\" fill=\"none\" fillRule=\"evenodd\"><g fill=\"currentColor\"><path d=\"M9,7.79516537 L9,1 L7,1 L7,7.56670377 L4.71728604,5.35377997 L3.32519442,6.78977472 L7.48559482,10.8229778 L8.21010405,11.5253364 L8.90589288,10.7945156 L12.86268,6.63850972 L11.4141755,5.25943949 L9,7.79516537 Z M14.5,16 L16,16 L16,10 L14,10 L14,14 L2,14 L2,10 L0,10 L0,16 L1.5,16 L14.5,16 L14.5,16 Z\" /></g></g></svg>\r\n\t\t\t\t</Button>\r\n\t\t\t</div>\r\n\t\t)}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## With processing files\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'File one',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'File two',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'File three',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: true,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection\r\n\t\tfiles={state.files}\r\n\t\tonFileClicked={file => console.log(file)}\r\n\t\trenderLoadingSpinner={() => <LoadingSpinner small />}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## With localized strings\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'Archivo uno',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'Archivo dos',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'Archivo tres',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection\r\n\t\ttitle=\"Archivos\"\r\n\t\tdropZoneText=\"Arrastra y suelta para subir archivos\"\r\n\t\tbrowseFilesButtonText=\"o navegar archivos\"\r\n\t\tmediaTypeLabels={{\r\n\t\t\tvideo: 'Vídeo',\r\n\t\t\taudio: 'Audio',\r\n\t\t\timage: 'Imagen',\r\n\t\t\tdefault: 'Otro',\r\n\t\t}}\r\n\t\tfiles={state.files}\r\n\t\tonFileClicked={file => console.log(file)}\r\n\t\tonUploadFiles={() => console.log('Handle upload files')}\r\n\t/>\r\n</div>\r\n```\r\n\r\n## Without clickable files\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'File one',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'File two',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'File three',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection files={state.files} />\r\n</div>\r\n```\r\n\r\n## With a large title\r\n\r\n```react\r\nshowSource: true\r\nstate: {\r\n\tfiles: [\r\n\t\t{\r\n\t\t\tid: 'one',\r\n\t\t\tmediaType: 'image/png',\r\n\t\t\tname: 'File one',\r\n\t\t\tbyteCount: 1244124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'two',\r\n\t\t\tmediaType: 'video/mp4',\r\n\t\t\tname: 'File two',\r\n\t\t\tbyteCount: 123,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t\t{\r\n\t\t\tid: 'three',\r\n\t\t\tmediaType: 'audio/mpeg',\r\n\t\t\tname: 'File three',\r\n\t\t\tbyteCount: 923992344124,\r\n\t\t\tisProcessing: false,\r\n\t\t},\r\n\t],\r\n}\r\n---\r\n<div>\r\n\t<FilesSection files={state.files} titleFontSize=\"32px\" />\r\n</div>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=36.356c05fc.chunk.js.map