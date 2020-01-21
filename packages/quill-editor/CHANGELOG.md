# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.4.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.4.1...@faithlife/quill-editor@4.4.2) (2020-01-21)


### Bug Fixes

* Pass onBlur directly to quill component. ([02dcdfe](https://git/Logos/FaithlifeEquipment/commits/02dcdfee44910f9c90f576bed3997d8150022f42))
* Update isEmpty any time contents are set. ([57d2c11](https://git/Logos/FaithlifeEquipment/commits/57d2c11b5ed3952d70d0091b68be823860a1f260))





## [4.4.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.4.0...@faithlife/quill-editor@4.4.1) (2020-01-17)


### Bug Fixes

* Fix rendered html for image wrapping. ([f1e55a3](https://git/Logos/FaithlifeEquipment/commits/f1e55a35a60fabcfa57cff136b2b63d6a98814f3))





# [4.4.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.3.1...@faithlife/quill-editor@4.4.0) (2020-01-17)


### Features

* Add 'raw' option for quill to return innerHTML of editor. ([2fd7946](https://git/Logos/FaithlifeEquipment/commits/2fd794611c76efeb424f74009d722deaeff64fbe))





## [4.3.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.3.0...@faithlife/quill-editor@4.3.1) (2020-01-16)


### Bug Fixes

* Handle plain text newlines. ([fa53083](https://git/Logos/FaithlifeEquipment/commits/fa5308350c1cc7a59bee134952d65f9a82f3cdcd))





# [4.3.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.2.0...@faithlife/quill-editor@4.3.0) (2020-01-16)


### Bug Fixes

* Don't include the quill-appended `\n` when returning plain text content. ([f168938](https://git/Logos/FaithlifeEquipment/commits/f1689381cf8132b42e5bf5da3ca845e7647c095b))


### Features

* Add methods setText and setContents to the imperative interface. ([426e106](https://git/Logos/FaithlifeEquipment/commits/426e1061f16d04f663361e79d52a72019b9ceddf))





# [4.2.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.1.4...@faithlife/quill-editor@4.2.0) (2020-01-15)


### Bug Fixes

* Set selection after inserted template. ([4bba042](https://git/Logos/FaithlifeEquipment/commits/4bba042630ef2d178d01581f8f67c3f1c4804027))


### Features

* Add a plainTextMode prop to apply all settings required for plain text editing. ([5a06dc0](https://git/Logos/FaithlifeEquipment/commits/5a06dc09289d85491d7d81f68c653236c96c1866))





## [4.1.4](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.1.3...@faithlife/quill-editor@4.1.4) (2020-01-15)


### Bug Fixes

* Treat Beta PR environments as not internal. ([bd0a140](https://git/Logos/FaithlifeEquipment/commits/bd0a1401ee44b1a641236c6e38aba78faba43f48))





## [4.1.3](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.1.2...@faithlife/quill-editor@4.1.3) (2020-01-14)


### Bug Fixes

* Fix null reference exception. ([45a506e](https://git/Logos/FaithlifeEquipment/commits/45a506e61ddca8bce6e19d5ff655cbc77b617fee))





## [4.1.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.1.1...@faithlife/quill-editor@4.1.2) (2020-01-14)


### Bug Fixes

* Only adjust selection after update if selection is at the end of content. ([017f389](https://git/Logos/FaithlifeEquipment/commits/017f389e4650887ca831a6e915fe120ec176a36d))





## [4.1.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.1.0...@faithlife/quill-editor@4.1.1) (2020-01-14)

**Note:** Version bump only for package @faithlife/quill-editor





# [4.1.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.0.1...@faithlife/quill-editor@4.1.0) (2020-01-14)


### Features

* Don't trigger update event when source is api. ([f4e8eaf](https://git/Logos/FaithlifeEquipment/commits/f4e8eaf06da4f317fc948bdf5f8a14c0ab7b0a0c))





## [4.0.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@4.0.0...@faithlife/quill-editor@4.0.1) (2020-01-13)


### Bug Fixes

* Fix inclusion of htmlOptions when getting html. ([126fd83](https://git/Logos/FaithlifeEquipment/commits/126fd839e7c5cae5e4f87ea5a741557803900cc5))
* Handle toolbarId changes. ([b4cf78f](https://git/Logos/FaithlifeEquipment/commits/b4cf78f434dd841c7221890f2dffc97695f10355))





# [4.0.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@3.0.0...@faithlife/quill-editor@4.0.0) (2020-01-08)


### Bug Fixes

* Don't override editorId even if the only child is Toolbar. ([ecf4079](https://git/Logos/FaithlifeEquipment/commits/ecf40799d801a671b09fe73340d4b34a72a21d89))
* Don't trigger a change event when controlled value is updated. ([886c3d3](https://git/Logos/FaithlifeEquipment/commits/886c3d39258e992b9f904d3cde18ea8748b49880))
* Fix server rendered placeholder. ([3b00a90](https://git/Logos/FaithlifeEquipment/commits/3b00a90f852056b858a80e7863ef82dd756284e2))
* Override contents with clipboard module so quill doesn't steal focus. ([519b2e4](https://git/Logos/FaithlifeEquipment/commits/519b2e441df4cff415abfbd603e3837c70007c4f))


### Features

* Allow default html option overrides. ([23d12a5](https://git/Logos/FaithlifeEquipment/commits/23d12a5a7df872dcc889acb91b7bc4fb3a653720))


### BREAKING CHANGES

* Controlled change won't trigger change events.
* The format of delta contents will likely be different when overriding content. This should not change how it's rendered.





# [3.0.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@2.0.2...@faithlife/quill-editor@3.0.0) (2020-01-02)


### Bug Fixes

* Initial selection when changing formats while typing. ([23322f3](https://git/Logos/FaithlifeEquipment/commits/23322f3c99e2f6caac3afff0661154e72d556ae1))


### Features

* Provide imperative api for correctly converting deltas (with images) to html. ([9c412bc](https://git/Logos/FaithlifeEquipment/commits/9c412bc20f763b49d3a834a46a04fadd3c943ac1))


### BREAKING CHANGES

* Html output may be slightly different than previous versions. (e.g. <br/> vs <br>)





## [2.0.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@2.0.1...@faithlife/quill-editor@2.0.2) (2019-12-20)


### Bug Fixes

* Fix controlled content. ([cc55daf](https://git/Logos/FaithlifeEquipment/commits/cc55daf2194a689b1221a42ee7d260566bb2e8e2))
* Fix selection for controlled content. ([8e4aa0a](https://git/Logos/FaithlifeEquipment/commits/8e4aa0a0bcbeeb66611572a8e6055d419a5f6d8e))





## [2.0.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@2.0.0...@faithlife/quill-editor@2.0.1) (2019-12-19)


### Bug Fixes

* Fix controlled content not updating with empty content. ([7b2f6ce](https://git/Logos/FaithlifeEquipment/commits/7b2f6ce0de9411a8faf324465e4890bfa6b4da37))





# [2.0.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.9.4...@faithlife/quill-editor@2.0.0) (2019-12-19)


### Features

* Automatically generate an editorId if the only child is a Toolbar. ([23a7449](https://git/Logos/FaithlifeEquipment/commits/23a7449509e1437861407b5b92d69b878a3abd9d))


### BREAKING CHANGES

* The QuillEditor component now only accepts a single child.





## [1.9.4](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.9.3...@faithlife/quill-editor@1.9.4) (2019-12-18)


### Bug Fixes

* Fix placeholder position and logic when controlled. ([67dbcd1](https://git/Logos/FaithlifeEquipment/commits/67dbcd1c19447ac71c7fb675950b5df71891b81f))





## [1.9.3](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.9.2...@faithlife/quill-editor@1.9.3) (2019-12-17)


### Bug Fixes

* Fix placeholder in more cases. ([0817199](https://git/Logos/FaithlifeEquipment/commits/0817199ff9a9c83ae8c795ec982d1d76ec2bd0fa))





## [1.9.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.9.1...@faithlife/quill-editor@1.9.2) (2019-12-17)


### Bug Fixes

* Fix placeholder when server rendering. ([e4a4208](https://git/Logos/FaithlifeEquipment/commits/e4a4208cfe04cf295efb2bcc787282bbc6c98982))





## [1.9.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.9.0...@faithlife/quill-editor@1.9.1) (2019-12-16)


### Bug Fixes

* Simplify placeholder and fix spacing. ([4335cd7](https://git/Logos/FaithlifeEquipment/commits/4335cd7c40ae31adb92ace749e97ffb5f8150d5b))





# [1.9.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.8.4...@faithlife/quill-editor@1.9.0) (2019-12-16)


### Features

* Expose convertDeltaToInlineHtml to allow consumers to render deltas without a quill editor. ([ab37c9e](https://git/Logos/FaithlifeEquipment/commits/ab37c9ea938a2b947856109c7b4326f30f24d454))





## [1.8.4](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.8.3...@faithlife/quill-editor@1.8.4) (2019-12-16)


### Bug Fixes

* Allow editorId without toolbar. ([5034be6](https://git/Logos/FaithlifeEquipment/commits/5034be62df3e7de8b9a49dcad35b58e1d6c1d7e6))





## [1.8.3](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.8.1...@faithlife/quill-editor@1.8.3) (2019-12-16)


### Bug Fixes

* Fix clean method. ([cac6f5b](https://git/Logos/FaithlifeEquipment/commits/cac6f5b0ad0bdcdce217dcb6ecfab3e6b14649ef))
* Manually bump versions after failed build. ([ef96a58](https://git/Logos/FaithlifeEquipment/commits/ef96a582c0d879f8206121abc6ee7b5a86936b65))





## [1.8.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.8.0...@faithlife/quill-editor@1.8.1) (2019-12-13)


### Bug Fixes

* Fix image selection and placeholder alignment when there's no toolbar. ([674dea8](https://git/Logos/FaithlifeEquipment/commits/674dea8719bc921e1965ed2715c5c6c2f3435bc0))





# [1.8.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.7.3...@faithlife/quill-editor@1.8.0) (2019-12-13)


### Features

* Implement image-safe clean method. ([7bf8b8a](https://git/Logos/FaithlifeEquipment/commits/7bf8b8a7c687676c807b164d1ed52acfc3c511cf))





## [1.7.3](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.7.2...@faithlife/quill-editor@1.7.3) (2019-12-13)


### Bug Fixes

* Fix logic for detecting when editor is empty. ([25954b3](https://git/Logos/FaithlifeEquipment/commits/25954b3fbff0d3da21232af1de90e29925b0ec96))





## [1.7.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.7.1...@faithlife/quill-editor@1.7.2) (2019-12-13)


### Bug Fixes

* Disable firefox native image resizing. ([228ca6a](https://git/Logos/FaithlifeEquipment/commits/228ca6a641a2123d8864eb5783f504df467a9ae7))





## [1.7.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.7.0...@faithlife/quill-editor@1.7.1) (2019-12-13)


### Bug Fixes

* Use custom placeholder to display when editor is formatted but empty. ([33e89c1](https://git/Logos/FaithlifeEquipment/commits/33e89c1dec3052e71568eecbc62bd8b8dd8b1354))





# [1.7.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.6.0...@faithlife/quill-editor@1.7.0) (2019-12-13)


### Features

* Add shortcuts for formats. ([cb1cdf7](https://git/Logos/FaithlifeEquipment/commits/cb1cdf764fcad0e3f42b676870db5eb69b52b057))





# [1.6.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.5.0...@faithlife/quill-editor@1.6.0) (2019-12-13)


### Bug Fixes

* Prevent overriding toolbar element classNames. ([2ed5cb7](https://git/Logos/FaithlifeEquipment/commits/2ed5cb7270ff7ebb79caebceeca6ff7697e7be39))


### Features

* Add disableImageControls prop to prevent resizing and wrapping images. ([80fe799](https://git/Logos/FaithlifeEquipment/commits/80fe79923377897335807e93eeab9c9b419be8a4))
* Add tabMode prop to easily choose between inserting tabs and exiting the editor with the tab key. ([1536378](https://git/Logos/FaithlifeEquipment/commits/15363784cc3f83308a8faf7c603e2b02b6b35248))





# [1.5.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.4.0...@faithlife/quill-editor@1.5.0) (2019-12-13)


### Bug Fixes

* Fix null reference error if editing too early. ([4d70ddb](https://git/Logos/FaithlifeEquipment/commits/4d70ddbf31d265b644d91871a142ecbecf0991ed))


### Features

* Add autofocus string prop. Use 'end' to focus the end of the document. ([c07c8b4](https://git/Logos/FaithlifeEquipment/commits/c07c8b49bd08491947f6509defb8e8020f51df79))





# [1.4.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.3.1...@faithlife/quill-editor@1.4.0) (2019-12-12)


### Features

* Fixup and add better image selection behavior. ([359751c](https://git/Logos/FaithlifeEquipment/commits/359751c54c8a5a8e9c423bef7c7cbe1c0c9b5f16))





## [1.3.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.3.0...@faithlife/quill-editor@1.3.1) (2019-12-10)

**Note:** Version bump only for package @faithlife/quill-editor





# [1.3.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.2.1...@faithlife/quill-editor@1.3.0) (2019-12-09)


### Features

* Allow consumers to override keyboard and clipboard modules without blowing away defaults. ([20705c1](https://git/Logos/FaithlifeEquipment/commits/20705c1420e3ead952eda9b94e685b7a5d2024c7))





## [1.2.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.2.0...@faithlife/quill-editor@1.2.1) (2019-12-09)


### Bug Fixes

* Fix null reference error. ([412d4a0](https://git/Logos/FaithlifeEquipment/commits/412d4a035f6ab820acd7912d37fbd2409e0802cd))
* Use default cursor when toolbar button is disabled. ([95ed9d2](https://git/Logos/FaithlifeEquipment/commits/95ed9d2ed81d521cfe7da9c30bc2a5218576878c))





# [1.2.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.1.1...@faithlife/quill-editor@1.2.0) (2019-12-09)


### Bug Fixes

* Use more compact header menu. ([f1fbe0c](https://git/Logos/FaithlifeEquipment/commits/f1fbe0c4add49abcccaaf5d52acf61e059c57782))


### Features

* Add third header option. ([270ff48](https://git/Logos/FaithlifeEquipment/commits/270ff48296d0418bae13c533d53779b7d7ad8d3b))





## [1.1.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.1.0...@faithlife/quill-editor@1.1.1) (2019-12-09)


### Bug Fixes

* Don't hide menu when not hovering it. ([66e1a52](https://git/Logos/FaithlifeEquipment/commits/66e1a52686f0f90cc4399fe5388c87128e7ee795))
* Equalize header option line heights. ([1c671b4](https://git/Logos/FaithlifeEquipment/commits/1c671b49265d1d906313a188f0b40986decbe9cc))





# [1.1.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@1.0.0...@faithlife/quill-editor@1.1.0) (2019-12-09)


### Features

* Allow links on images. ([6bd3cf6](https://git/Logos/FaithlifeEquipment/commits/6bd3cf605307f1995e8b8c805cf8fd35e5c2d596))





# [1.0.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.6.1...@faithlife/quill-editor@1.0.0) (2019-12-06)


### Bug Fixes

* Fix image alignment controls. ([010e34e](https://git/Logos/FaithlifeEquipment/commits/010e34eecd48fb761e7e24582c21e605823cad1b))
* Use custom blot name for images and image alignment to allow html rendering. ([0b7548c](https://git/Logos/FaithlifeEquipment/commits/0b7548c2c54d9cc7b59aae796dfe0ae95b6f5286))


### BREAKING CHANGES

* Removed the htmlOptions prop since inline html will never be returned by onContentChange.





## [0.6.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.6.0...@faithlife/quill-editor@0.6.1) (2019-12-04)


### Bug Fixes

* Attach file picker to body element. ([f2e50b7](https://git/Logos/FaithlifeEquipment/commits/f2e50b75c140984a7f0bcbc519ce09653cb0afad))





# [0.6.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.5.0...@faithlife/quill-editor@0.6.0) (2019-12-04)


### Bug Fixes

* Handle custom image attributes when converting to html. ([0e53e04](https://git/Logos/FaithlifeEquipment/commits/0e53e0419174d2f5c3007d3d79d4a2cf10b4d837))


### Features

* Allow html input. ([3fa0d59](https://git/Logos/FaithlifeEquipment/commits/3fa0d59deb363caa9d48216795f17f997c335e5b))





# [0.5.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.4.0...@faithlife/quill-editor@0.5.0) (2019-12-04)


### Bug Fixes

* Fix DOM differences between server rendered and client rendered. ([61a2f4d](https://git/Logos/FaithlifeEquipment/commits/61a2f4d18a07a7ffa830a34d003ad151e7048dab))


### Features

* Allow placeholder to update dynamically. ([a203b72](https://git/Logos/FaithlifeEquipment/commits/a203b721a869d028995cb46da6db4a54193d6e80))





# [0.4.0](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.3.4...@faithlife/quill-editor@0.4.0) (2019-12-02)


### Bug Fixes

* Only access Quill if it's available. ([7d8bd17](https://git/Logos/FaithlifeEquipment/commits/7d8bd17596bc15e4e77de3995c509d268cb8bc0c))


### Features

* Allow a classNames prop on QuillEditor. ([17a75a4](https://git/Logos/FaithlifeEquipment/commits/17a75a498f8e9edd5a3294afd4c6696195783d02))





## [0.3.4](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.3.3...@faithlife/quill-editor@0.3.4) (2019-11-27)


### Bug Fixes

* Remove references to Quill and remove dependency. ([b8fe899](https://git/Logos/FaithlifeEquipment/commits/b8fe899a433ad3f882468ed0f8579d062edafbe1))





## [0.3.3](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.3.2...@faithlife/quill-editor@0.3.3) (2019-11-27)


### Bug Fixes

* Move quill and react-quill to peer dependencies. ([ce2ab2e](https://git/Logos/FaithlifeEquipment/commits/ce2ab2e8724fa3897a495525c6cc6f8c4634997b))
* Revert copied quill delta to html module. ([7456289](https://git/Logos/FaithlifeEquipment/commits/7456289b79359367c2af6229574d9922a9fe46ef))





## [0.3.2](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.3.1...@faithlife/quill-editor@0.3.2) (2019-11-27)


### Bug Fixes

* Add explicit any to useImageDrop. ([5144073](https://git/Logos/FaithlifeEquipment/commits/5144073fc2dda9c5b948d22068720f80a3161573))





## [0.3.1](https://git/Logos/FaithlifeEquipment/compare/@faithlife/quill-editor@0.3.0...@faithlife/quill-editor@0.3.1) (2019-11-26)


### Bug Fixes

* Publish quill editor styles with code. ([df83eff](https://git/Logos/FaithlifeEquipment/commits/df83eff50fbb2c44693c26ce79b8224ed4ecd179))





# 0.3.0 (2019-11-26)



# 0.2.0 (2019-11-26)


### Bug Fixes

* Fix alignment options styling. ([5158be0](https://git/Logos/FaithlifeEquipment/commits/5158be04cdbbe4c58b928ae1a06307c9a4c96c2b))
* Fix example app. ([f7a3114](https://git/Logos/FaithlifeEquipment/commits/f7a3114262470a2fbf5fe788433d9d0e1ba750c3))
* Remove most `!important` selectors by increasing specificity. ([a5ac04f](https://git/Logos/FaithlifeEquipment/commits/a5ac04f6b5a64b4d7bfcccc43f80af063a50c223))
* Update Modal to v6. ([bb6457e](https://git/Logos/FaithlifeEquipment/commits/bb6457e40635ff1e623cb9235015e1a329d8b39b))


### Features

* Add alignment to quill-editor controls. ([e4620cf](https://git/Logos/FaithlifeEquipment/commits/e4620cf81b5f2305aa1c18fb21ad3ea60e9236f5))
* Add placeholder tests. ([5dcfed4](https://git/Logos/FaithlifeEquipment/commits/5dcfed4828701339822fe749e8ab4919d348736b))
* Allow both controlled and uncontrolled modes. ([c6a2b03](https://git/Logos/FaithlifeEquipment/commits/c6a2b0308faf5aa382b553043b6b407c137b3f72))
* Allow dropping images into quill and uploading to amber. ([add5493](https://git/Logos/FaithlifeEquipment/commits/add54935e863b850fdea1de65f65a0c61d520637))





# 0.2.0 (2019-11-26)


### Bug Fixes

* Fix alignment options styling. ([5158be0](https://git/Logos/FaithlifeEquipment/commits/5158be04cdbbe4c58b928ae1a06307c9a4c96c2b))
* Fix example app. ([f7a3114](https://git/Logos/FaithlifeEquipment/commits/f7a3114262470a2fbf5fe788433d9d0e1ba750c3))
* Remove most `!important` selectors by increasing specificity. ([a5ac04f](https://git/Logos/FaithlifeEquipment/commits/a5ac04f6b5a64b4d7bfcccc43f80af063a50c223))
* Update Modal to v6. ([bb6457e](https://git/Logos/FaithlifeEquipment/commits/bb6457e40635ff1e623cb9235015e1a329d8b39b))


### Features

* Add alignment to quill-editor controls. ([e4620cf](https://git/Logos/FaithlifeEquipment/commits/e4620cf81b5f2305aa1c18fb21ad3ea60e9236f5))
* Add placeholder tests. ([5dcfed4](https://git/Logos/FaithlifeEquipment/commits/5dcfed4828701339822fe749e8ab4919d348736b))
* Allow both controlled and uncontrolled modes. ([c6a2b03](https://git/Logos/FaithlifeEquipment/commits/c6a2b0308faf5aa382b553043b6b407c137b3f72))
* Allow dropping images into quill and uploading to amber. ([add5493](https://git/Logos/FaithlifeEquipment/commits/add54935e863b850fdea1de65f65a0c61d520637))
