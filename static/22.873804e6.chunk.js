webpackJsonp([22],{

/***/ 1457:
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
        return {content: __webpack_require__(1513)};
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

/***/ 1513:
/***/ (function(module, exports) {

module.exports = "```react\r\nnoSource: true\r\n---\r\n<React.Fragment>\r\n\t<V6Banner oldHash=\"#/dropdown/variations\">\r\n\t\t<AcceptsStyledSystemProps />\r\n\t\t<AriaCompliant />\r\n\t</V6Banner>\r\n</React.Fragment>\r\n```\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle>Show a Dropdown!</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 1\")}>Menu Item 1</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 2\")}>Menu Item 2</Menu.Item>\r\n\t\t\t<Menu.Item disabled onClick={() => alert(\"Menu Item 3\")}>Menu Item 3</Menu.Item>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n\r\n## Split Dropdown Toggle\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle>\r\n\t\t\t<Menu.ActionButton onClick={() => alert(\"Different Action\")}>Show a Dropdown!</Menu.ActionButton>\r\n\t\t</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 1\")}>Menu Item 1</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 2\")}>Menu Item 2</Menu.Item>\r\n\t\t\t<Menu.Item disabled onClick={() => alert(\"Menu Item 3\")}>Menu Item 3</Menu.Item>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n\r\n## Dropdown Menu Items\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false, isChecked: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle>Show a Dropdown!</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Title>Dropdown</Menu.Title>\r\n\t\t\t<Menu.Separator />\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item\")}>Menu Item</Menu.Item>\r\n\t\t\t<Menu.CheckboxItem isChecked={state.isChecked} onToggle={() => setState({ isChecked: !state.isChecked })}>Menu Checkbox</Menu.CheckboxItem>\r\n\t\t\t<Menu.LinkItem href=\"https://faithlife.github.io/styled-ui/#/icons\" target=\"_blank\">Menu Link</Menu.LinkItem>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n\r\n## Using custom toggle component\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle>\r\n\t\t\t{(ref, {onKeyDown, onClick, ariaProps}) =>\r\n\t\t\t\t<Button variant=\"primary\" size=\"medium\" ref={ref} onKeyDown={onKeyDown} onClick={onClick} {...ariaProps}>Show a Dropdown!</Button>}\r\n\t\t</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 1\")}>Menu Item 1</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 2\")}>Menu Item 2</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 3\")}>Menu Item 3</Menu.Item>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n\r\n## With icon\r\n\r\nvariant = icon | thumbnail | avatar\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} width=\"280px\" onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle>Show a Dropdown!</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 1\")}>\r\n\t\t\t\t<Menu.ItemIcon><FavoriteFilled /></Menu.ItemIcon>\r\n\t\t\t\t<Menu.ItemPrimaryText>Menu Item 1</Menu.ItemPrimaryText>\r\n\t\t\t\t<Menu.ItemSecondaryText>Variant = Icon</Menu.ItemSecondaryText>\r\n\t\t\t</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 2\")}>\r\n\t\t\t\t<Menu.ItemIcon src={thumbnailSrc} variant=\"thumbnail\" />\r\n\t\t\t\t<Menu.ItemPrimaryText>Menu Item 2</Menu.ItemPrimaryText>\r\n\t\t\t\t<Menu.ItemSecondaryText>Variant = Thumbnail</Menu.ItemSecondaryText>\r\n\t\t\t</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 3\")}>\r\n\t\t\t\t<Menu.ItemIcon src={avatarSrc} variant=\"avatar\" />\r\n\t\t\t\t<Menu.ItemPrimaryText fontWeight={1}>Menu Item 3 (Avatar)</Menu.ItemPrimaryText>\r\n\t\t\t</Menu.Item>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n\r\n## Styling\r\n\r\nToggle, Menu, Title, Item, Item variants, and Item config children all accept styled-system props.\r\n\r\n```react\r\nshowSource: true\r\nstate: { isOpen: false }\r\n---\r\n<MenuDemo>\r\n\t<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>\r\n\t\t<Menu.Toggle variant=\"minor\">Show a Dropdown!</Menu.Toggle>\r\n\t\t<Menu.Dropdown>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 1\")}>\r\n\t\t\t\t<Menu.ItemTextContainer display=\"flex\">Menu Item 1</Menu.ItemTextContainer>\r\n\t\t\t</Menu.Item>\r\n\t\t\t<Menu.Item onClick={() => alert(\"Menu Item 2\")}>Menu Item 2</Menu.Item>\r\n\t\t\t<Menu.Item color=\"red\" onClick={() => alert(\"Menu Item 3\")}>Menu Item 3</Menu.Item>\r\n\t\t</Menu.Dropdown>\r\n\t</Menu>\r\n</MenuDemo>\r\n```\r\n"

/***/ })

});
//# sourceMappingURL=22.873804e6.chunk.js.map