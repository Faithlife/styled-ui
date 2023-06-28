webpackJsonp([12],{

/***/ 1432:
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
        return {content: __webpack_require__(1488)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!../../node_modules/raw-loader/index.js!./documentation.md", function() {
            component.setState({
              content: require("!!../../node_modules/raw-loader/index.js!./documentation.md")
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

/***/ 1488:
/***/ (function(module, exports) {

module.exports = "A component for layout out elements in a horizontal masonry style. This layout uses varying row heights to allow multiple elements of varying aspect ratio to align to the width of a container.\r\n\r\nNOTE: This is a JavaScript-based layout that requires a known container width. It may not be appropriate for uses cases where server-rendered content is required.\r\n\r\n## Possible polyfill requirements\r\n\r\nThis component assumes the availability of the following APIs, which may require polyfills in your application:\r\n\r\n- `ResizeObserver`\r\n\r\n## Automatic layout for in-memory collections\r\n\r\n`AutoSizedRowMasonry` is a high-level component that uses a `ResizeObserver` to track the size of the container and automatically handle rendering.\r\n\r\n```react\r\nshowSource: true\r\n---\r\n<Box maxWidth={400}>\r\n\t<AutoSizedRowMasonry\r\n\t\titems={new Array(20).fill(true).map(x => ({aspectRatio: (Math.random() + 0.2) * 2 }))}\r\n\t\tgetItemAspectRatio={x => x.aspectRatio}\r\n\t\tgapSize={12}\r\n\t\ttargetRowHeight={100}\r\n\t\tminRowItems={1}\r\n\t\tmaxRowItems={4}\r\n\t\trenderItem={x => (\r\n\t\t\t<Box flex={1} backgroundColor=\"blue2\" />\r\n\t\t)}\r\n\t/>\r\n</Box>\r\n```\r\n\r\nIf you need more flexibility (such as for virtualized rendering), you can use the lower-level components.\r\n\r\nThe `getRowLayout` function accepts a collection of items and parameters to use in the layout calculation, and returns layout information. Use the layout data to compose `MasonryRow` and `MasonryCell` elements into the final layout.\r\n\r\n```\r\nconst layout =\r\n\tgetRowLayout(items, {\r\n\t\tgetItemAspectRatio, // function that accepts an item and returns a number representing the item's aspect ratio (width / height)\r\n\t\twidth: 300, // width of the container in pixels\r\n\t\tgapWidth: 12, // width of the gap between columns in pixels\r\n\t\ttargetHeight: 100, // target row height to shoot for, in pixels\r\n\t\tminRowItems: 1, // minimum number of items per row\r\n\t\tmaxRowItems: 4, // maximum number of items per row\r\n\t});\r\n\r\n\treturn (\r\n\t\t<Box display=\"grid\" gridAutoFlow=\"row\" gridRowGap={12}>\r\n\t\t\t{layout.rows.map((row, i) => (\r\n\t\t\t\t\t<MasonryRow\r\n\t\t\t\t\t\tkey={i}\r\n\t\t\t\t\t\trow={row}\r\n\t\t\t\t\t\trenderCell={({ item, aspectRatio, index }) => (\r\n\t\t\t\t\t\t\t<MasonryCell key={index} aspectRatio={aspectRatio}>\r\n\t\t\t\t\t\t\t\t<Box flex={1}>{item.title}</Box>\r\n\t\t\t\t\t\t\t</MasonryCell>\r\n\t\t\t\t\t\t)}\r\n\t\t\t\t\t/>\r\n\t\t\t\t))}\r\n\t\t</Box>\r\n\t);\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=12.3407abbd.chunk.js.map