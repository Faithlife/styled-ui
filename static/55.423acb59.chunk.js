webpackJsonp([55],{

/***/ 1425:
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
        return {content: __webpack_require__(1481)};
      },
      componentWillMount: function() {
        var component = this;
        if (false) {
          module.hot.accept("!!./node_modules/raw-loader/index.js!./UpgradeGuide.md", function() {
            component.setState({
              content: require("!!./node_modules/raw-loader/index.js!./UpgradeGuide.md")
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

/***/ 1481:
/***/ (function(module, exports) {

module.exports = "# Upgrade Guide\r\n\r\n## Upgrading from v5 to v6\r\n\r\n- Installation\r\n  - Styled-UI v6 should be installed as a **direct** dependency, not a peerDependency anymore.\r\n- Importing\r\n  - Importing from `'@faithlife/styled-ui/v6'` has been removed—import v6 components from `'@faithlife/styled-ui'` now.\r\n- `Accordion`\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for `Accordion.Panel` directly on that component.\r\n- `AnchorButton`\r\n  - `AnchorButton` has been removed—use `<Button as=\"a\" />` instead.\r\n- `Button`\r\n  - Check your variants:\r\n    - `primaryOutline` has been replaced by `secondary`.\r\n    - `primaryTransparent` has been replaced by `link` and now uses inline spacing (no padding) by default.\r\n  - Check your sizes:\r\n    - Standalone props have been replaced by the `size` prop, such as `size=\"medium\"` instead of `medium`.\r\n    - Size definitions have also changed, and the `condensed` prop is no longer used. The following table summarizes the differences:\r\n      ```\r\n                 ┌───────────────────────────┬────────────────────────────┬────────────────────────────┐\r\n                 │          \"small\"          │          \"medium\"          │          \"large\"           │\r\n                 ├─────┬──────────────┬──────┼──────┬──────────────┬──────┼──────┬──────────────┬──────┤\r\n                 │ v5  │ v5 condensed │  v6  │  v5  │ v5 condensed │  v6  │  v5  │ v5 condensed │  v6  │\r\n      ┌──────────┼─────┴──────────────┼──────┼──────┴──────────────┼──────┼──────┴──────────────┼──────┤\r\n      │ height   │        32px        │ 32px │        40px         │ 40px │        56px         │ 48px │\r\n      ├──────────┼─────┬──────────────┼──────┼──────┬──────────────┼──────┼──────┬──────────────┼──────┤\r\n      │ paddingX │ 8px │      6px     │  6px │ 14px │     10px     │ 10px │ 22px │     14px     │ 11px │\r\n      └──────────┴─────┴──────────────┴──────┴──────┴──────────────┴──────┴──────┴──────────────┴──────┘\r\n      ```\r\n    - Size variant styles no longer change the dimensions of child `<svg>`s, so manually resize yours as needed.\r\n- `Checkbox`\r\n  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.\r\n- `DatePickerInput`\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props. Use style props for the input directly on the `DatePickerInput` component, and use style props for the calendar popover on a `DatePickerInput.Popover` child config component.\r\n  - The `placement` prop has been removed—use `placement` on `DatePickerInput.Popover` instead.\r\n- `Dropdown`\r\n  - The `Dropdown` component has been renamed to `Menu`.\r\n    - `Dropdown.Menu` has been renamed `Menu.Dropdown`.\r\n  - \"Dropdown\" is a general term that refers to content inside of a popover. For more details, see the docs on the `Menu` and `Listbox` components.\r\n- `HelpBox`\r\n  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.\r\n- `Input`\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props.\r\n- `LoadingSpinner`\r\n  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.\r\n- `Modal`\r\n  - Subcomponents have been renamed, `ModalContent` has been replaced by `Modal.Content`, etc.\r\n- `ParameterSentence`\r\n  - Subcomponents have been renamed: `ParameterSelect` to `ParameterSentence.Select`, `ParameterInputBox` to `ParameterSentence.Input`.\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props.\r\n- `Popover`\r\n  - `PopoverManager` and `PopoverReference` have been removed. See [`Popover`'s documentation](https://faithlife.github.io/styled-ui/#/popover/variations) for the new API.\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props.\r\n- `Radio`\r\n  - The old `theme` prop functionality has been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.\r\n- `SimpleToast`\r\n  - The `styleOverrides` prop and old `theme` prop have been replaced by the [global theme object](https://faithlife.github.io/styled-ui/#/theme/usage) and Styled System props. Use the [`ThemeProvider` component](https://faithlife.github.io/styled-ui/#/theme/customization) to customize the theme.\r\n- `Slider`\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props.\r\n- `Tab`\r\n  - Subcomponents have been renamed: `TabList` to `Tab.List`, `SequencedTabList` to `SequencedTab.List`, etc.\r\n- `text-input` components\r\n  - Components previously imported from `'@faithlife/styled-ui/dist/text-input-v2'` should now be imported from `'@faithlife/styled-ui/text-input'`:\r\n    ```code\r\n    lang: js\r\n    ---\r\n    import {\r\n    \tAsyncSelect,\r\n    \tCreatableSelect,\r\n    \tAsyncCreatableSelect,\r\n    \tSelect,\r\n    \tavatarComponents,\r\n    \treactSelectComponents,\r\n    \tInferredText,\r\n    \tInferredSelect,\r\n    } from '@faithlife/styled-ui/text-input';\r\n    ```\r\n  - Deprecated components previously imported from `'@faithlife/styled-ui/dist/text-input'` (`Typeahead`, `AsyncTypeahead`, `Token`, `Menu`, `MenuItem`, `InferredTypeahead`) have been removed.\r\n  - `Select` components behave slightly differently now in one situation. When `isMulti` is `true`, if one or more options are selected and then later all selected options are removed, upon the removal of the last option the value passed to `onChange` will be `null`. In v5, the value passed to `onChange` in this situation would have been `[]`. See the [React Select v3 upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for more details.\r\n- `Tooltip`\r\n  - The `styleOverrides` prop has been removed in favor of Styled System props.\r\n"

/***/ })

});
//# sourceMappingURL=55.423acb59.chunk.js.map