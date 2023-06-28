webpackJsonp([33],{

/***/ 1453:
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
        return {content: __webpack_require__(1509)};
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

/***/ 1509:
/***/ (function(module, exports) {

module.exports = "An `ImageWell` is a component used to select and display an image.\r\n\r\n```react\r\nshowSource: true\r\n\r\nstate: { previewUrl: '' }\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={state.previewUrl}\r\n    onSelectImage={() => {\r\n        if (state.previewUrl) {\r\n            alert(\"Image selected\");\r\n        }  else {\r\n            alert(\"Image added\");\r\n            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });\r\n        }\r\n    }}\r\n    onRemoveImage={() => {\r\n        setState({ previewUrl: ''});\r\n        alert(\"Image removed\");\r\n    }}\r\n/>\r\n```\r\n\r\n### Default preview image controls\r\n\r\nWhen a `previewUrl` is provided, an icon will appear in the upper-right corner of the ImageWell.\r\n\r\nIf `onRemoveImage` is provided, an X icon will be shown in the upper-right corner and the function will be passed to the icon's `onClick` handler. The rest of the `ImageWell` can be clicked and will call `onSelectImage`. This is useful if you want to be able to remove an image and also do something when the preview image is clicked, like display it in a lightbox.\r\n\r\n```react\r\nshowSource: true\r\n\r\nstate: { previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' }\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={state.previewUrl}\r\n    onSelectImage={() => {\r\n        if (state.previewUrl) {\r\n            alert(\"Image selected\");\r\n        }  else {\r\n            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });\r\n        }\r\n    }}\r\n    onRemoveImage={() => {\r\n        setState({ previewUrl: ''});\r\n        alert(\"Image removed\");\r\n    }}\r\n/>\r\n```\r\n\r\nIf `onRemoveImage` is not provided, a camera icon will be shown in the upper-right corner. Clicking any part of the `ImageWell` will call `onSelectImage`. This is useful if you only want the user to be able to change and not remove an image.\r\n\r\n```react\r\nshowSource: true\r\n\r\nstate: { previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' }\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={state.previewUrl}\r\n    onSelectImage={() => {\r\n        if (state.previewUrl) {\r\n            alert(\"Choose a new image\");\r\n        }\r\n    }}\r\n/>\r\n```\r\n\r\n### Preview image size\r\n\r\nBy default, the size of the preview image is constrained to fit within the ImageWell. Specifying `fitPreviewToSquare` will scale the image to fit the container.\r\n\r\n```react\r\nshowSource: true\r\n\r\n---\r\n\r\n<ImageWell\r\n    fitPreviewToSquare\r\n    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}\r\n    onSelectImage={() => {}}\r\n/>\r\n\r\n```\r\n\r\n### Custom content\r\n\r\n#### ImageWell.SelectContent\r\n\r\nProvide `ImageWell.SelectContent` to change what the `ImageWell` displays when there is no `previewUrl`.\r\n\r\n```react\r\nshowSource: true\r\n\r\nstate: { previewUrl: '' }\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={state.previewUrl}\r\n    onSelectImage={() => {\r\n        if (state.previewUrl) {\r\n            alert(\"Room layout selected\");\r\n        }  else {\r\n            alert(\"Room layout added\");\r\n            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });\r\n        }\r\n    }}\r\n    onRemoveImage={() => {\r\n        alert(\"Room layout removed\");\r\n        setState({ previewUrl: ''});\r\n    }}\r\n>\r\n    <ImageWell.SelectContent>\r\n        + Add Room Layout\r\n    </ImageWell.SelectContent>\r\n</ImageWell>\r\n```\r\n\r\n#### ImageWell.PreviewContent\r\n\r\nProvide `ImageWell.PreviewContent` to change what gets displayed over the preview image.\r\n\r\n```react\r\nshowSource: true\r\n\r\nstate: { previewUrl: ''}\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={state.previewUrl}\r\n    onSelectImage={() => {\r\n        if (state.previewUrl) {\r\n            alert(\"Room layout selected\");\r\n        }  else {\r\n            alert(\"Room layout added\");\r\n            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });\r\n        }\r\n    }}\r\n>\r\n    <ImageWell.PreviewContent>\r\n        <ImageWell.RemoveIcon\r\n            onClick={() => {\r\n                alert(\"Room layout removed\");\r\n                setState({ previewUrl: ''});\r\n            }}\r\n        />\r\n        <FavoriteFilled\r\n            color=\"yellow\"\r\n            style={{\r\n                position: 'absolute',\r\n                top: '6px',\r\n                left: '6px',\r\n            }}\r\n            onClick={(e) => {\r\n                e.stopPropagation();\r\n                alert(\"Star clicked\");\r\n            }}\r\n        />\r\n\r\n    </ImageWell.PreviewContent>\r\n    <ImageWell.SelectContent>\r\n        + Add Room Layout\r\n    </ImageWell.SelectContent>\r\n</ImageWell>\r\n```\r\n\r\n#### Icons\r\n\r\nThe X and camera icons that are shown without custom `ImageWell.PreviewContent` can be used in custom preview content. Provide an `onClick` handler to customize the behavior of the icon, otherwise `onSelectImage` will be called.\r\n\r\n```react\r\nshowSource: true\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}\r\n    onSelectImage={() => alert(\"Image selected\")}\r\n>\r\n    <ImageWell.PreviewContent>\r\n        <ImageWell.RemoveIcon onClick={(e) => {\r\n            e.stopPropagation();\r\n            alert(\"Remove icon clicked\");\r\n        }}/>\r\n    </ImageWell.PreviewContent>\r\n</ImageWell>\r\n```\r\n\r\n```react\r\nshowSource: true\r\n\r\n---\r\n\r\n<ImageWell\r\n    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}\r\n    onSelectImage={() => alert(\"Image selected\")}\r\n>\r\n    <ImageWell.PreviewContent>\r\n        <ImageWell.CameraIcon onClick={() => {}} />\r\n        <FavoriteFilled\r\n            color=\"yellow\"\r\n            style={{\r\n                position: 'absolute',\r\n                top: '6px',\r\n                left: '6px',\r\n            }}\r\n            onClick={(e) => {\r\n                e.stopPropagation();\r\n                alert(\"Star clicked\");\r\n            }}\r\n        />\r\n    </ImageWell.PreviewContent>\r\n</ImageWell>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=33.3dd968df.chunk.js.map