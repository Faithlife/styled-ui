// Use yarn to verify that it is installed as a direct dep and that it is using v6.

const scale = [0, '2px', '4px', '8px', '12px', '16px', '24px', '32px', '64px', '96px'];

// Change all imports
export function changeV6Imports(j, root) {
	const baseImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});
	const v6Imports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui/v6' },
	});

	const baseNodes = baseImports.nodes();
	const v6Nodes = v6Imports.nodes();
	if (v6Nodes.length) {
		const baseItems = baseNodes
			.reduce(
				(topList, node) => [
					...topList,
					node.specifiers.reduce((list, item) => [...list, item.imported.name], []),
				],
				[],
			)
			.flat();

		const v6Items = v6Nodes
			.reduce(
				(topList, node) => [
					...topList,
					node.specifiers.reduce((list, item) => [...list, item.imported.name], []),
				],
				[],
			)
			.flat();

		const firstBaseImport = baseImports.at(0);
		const firstImport = firstBaseImport.nodes().length ? firstBaseImport : v6Imports.at(0);

		firstImport.insertAfter(
			j.importDeclaration(
				baseItems
					.concat(v6Items)
					.sort()
					.map(x => j.importSpecifier(j.identifier(x))),
				j.literal('@faithlife/styled-ui'),
				'value',
			),
		);
	}

	baseImports.remove();
	v6Imports.remove();
}

// Remove styledOverrides
export function removeStyleOverrides(j, root) {
	// accordion
	const accordions = getElementsWithOverrides(j, root, 'Accordion', 'styleOverrides');
	accordions.forEach(ele => {
		console.log(ele);
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);
		console.log(styleOverrides);

		const oldPadding = styleOverrides.pannelPadding;
		const scaleIdx = scale.indexOf(oldPadding);
		const pannelPadding = scaleIdx !== -1 ? scaleIdx : oldPadding;

		const pannels = j(ele).find(j.JSXElement, {
			openingElement: { name: { property: { name: 'Panel' } } },
		});
		console.log(pannels);

		pannels.forEach(panel => {
			const openingElement = j(panel.value.openingElement);
			console.log(panel, openingElement.at(0).get());
			const attributes = openingElement.find(j.JSXAttribute);
			const paddingAttr = openingElement.find(j.JSXAttribute, {
				name: { name: 'padding' },
			});
			console.log(attributes, paddingAttr);

			if (!paddingAttr.length) {
				const openingNode = openingElement.at(0).get();
				const newValue =
					typeof pannelPadding === 'string'
						? j.stringLiteral(pannelPadding)
						: j.jsxExpressionContainer(j.literal(pannelPadding));
				openingNode.value.attributes.push(j.jsxAttribute(j.jsxIdentifier('padding'), newValue));
			}
		});

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
			.remove();
	});

	// datePickerInput
	const datePickerInputs = getElementsWithOverrides(j, root, 'DatePickerInput', 'styleOverrides');
	addTodoComments(j, datePickerInputs, 'styleOverrides');

	// input
	const inputs = getElementsWithOverrides(j, root, 'Input', 'styleOverrides');
	inputs.forEach(ele => {
		console.log(ele);
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);
		const openingElement = ele.value.openingElement;

		if (styleOverrides.height) {
			const newValue =
				typeof styleOverrides.height === 'string'
					? j.stringLiteral(styleOverrides.height)
					: j.jsxExpressionContainer(j.literal(styleOverrides.height));
			openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier('height'), newValue));
		}

		if (styleOverrides.width) {
			const newValue =
				typeof styleOverrides.width === 'string'
					? j.stringLiteral(styleOverrides.width)
					: j.jsxExpressionContainer(j.literal(styleOverrides.width));
			openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier('width'), newValue));
		}

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
			.remove();
	});

	// parameterSentence
	const paramSelect = getElementsWithOverrides(j, root, 'ParameterSelect', 'styleOverrides');
	const paramInput = getElementsWithOverrides(j, root, 'ParameterInputBox', 'styleOverrides');
	addTodoComments(j, paramSelect, 'styleOverrides');
	addTodoComments(j, paramInput, 'styleOverrides');

	// popover
	// TODO make sure this is handled in the popover specific func

	// simpleToast
	const toast = getElementsWithOverrides(j, root, 'SimpleToast', 'styleOverrides');
	addTodoComments(j, toast, 'styleOverrides');

	//slider
	const sliders = getElementsWithOverrides(j, root, 'Slider', 'styleOverrides');
	sliders.forEach(ele => {
		console.log(ele);
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);
		const openingElement = ele.value.openingElement;

		if (styleOverrides.backgroundColor) {
			openingElement.attributes.push(
				j.jsxAttribute(
					j.jsxIdentifier('backgroundColor'),
					j.stringLiteral(styleOverrides.backgroundColor),
				),
			);
		}

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
			.remove();
	});

	// tooltip
	const tooltips = getElementsWithOverrides(j, root, 'Tooltip', 'styleOverrides');
	addTodoComments(j, tooltips, 'styleOverrides');
}

// Remove styledTheme
export function removeThemeProp(j, root) {
	// checkbox
	const checkboxes = getElementsWithOverrides(j, root, 'Checkbox', 'theme');
	addTodoComments(j, checkboxes, 'theme');

	// helpBox
	const helpBoxes = getElementsWithOverrides(j, root, 'HelpBox', 'theme');
	addTodoComments(j, helpBoxes, 'theme');

	// loadingSpinner
	const loadingSpinners = getElementsWithOverrides(j, root, 'LoadingSpinner', 'theme');
	addTodoComments(j, loadingSpinners, 'theme');

	// radio
	const radios = getElementsWithOverrides(j, root, 'Radio', 'theme');
	addTodoComments(j, radios, 'theme');

	// simpleToast
	const toasts = getElementsWithOverrides(j, root, 'SimpleToast', 'styleOverrides');
	toasts.forEach(ele => {
		const styleOverrides = getPropAsObj(j, 'theme', ele);
		const openingElement = ele.value.openingElement;

		if (styleOverrides.backgroundColor) {
			openingElement.attributes.push(
				j.jsxAttribute(
					j.jsxIdentifier('backgroundColor'),
					j.stringLiteral(styleOverrides.backgroundColor),
				),
			);
		}

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'theme' } })
			.remove();
	});
}

export function updateButtons(j, root) {
	const buttons = root.findJSXElements('Button');

	buttons.forEach(ele => {
		const element = j(ele);
		const variant = element.find(j.JSXAttribute, { name: { name: 'variant' } });
		const size = element.find(j.JSXAttribute, { name: { name: 'variant' } });

		// TODO make sure this is checking for invalid variants
		const variantsList = [
			['primary', element.find(j.JSXAttribute, { name: { name: 'primary' } })],
			[
				'primaryOutline',
				element.find(j.JSXAttribute, { name: { name: 'primaryOutline' } }),
				'secondary',
			],
			[
				'primaryTransparent',
				element.find(j.JSXAttribute, { name: { name: 'primaryTransparent' } }),
				'link',
			],
			['minor', element.find(j.JSXAttribute, { name: { name: 'minor' } })],
			['minorTransparent', element.find(j.JSXAttribute, { name: { name: 'minorTransparent' } })],
		];
		const sizeList = [
			['small', element.find(j.JSXAttribute, { name: { name: 'small' } })],
			['medium', element.find(j.JSXAttribute, { name: { name: 'medium' } })],
			['large', element.find(j.JSXAttribute, { name: { name: 'large' } })],
		];

		let addedSize = !!size.length;
		for (const [name, collection, newName] of sizeList) {
			if (!addedSize && collection.length) {
				ele.node.openingElement.attributes.unshift(
					j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral(newName || name)),
				);
				addedSize = true;
			}

			collection.remove();
		}

		let addedVariant = !!variant.length;
		for (const [name, collection, newName] of variantsList) {
			if (!addedVariant && collection.length) {
				ele.node.openingElement.attributes.unshift(
					j.jsxAttribute(j.jsxIdentifier('variant'), j.stringLiteral(newName || name)),
				);
				addedVariant = true;
			}

			collection.remove();
		}
	});

	// Handle condensed
	const condensed = getElementsWithOverrides(j, root, 'Button', 'condensed');
	condensed.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO the `condenced` prop has been removed and the padding will need to be manually adjusted. ',
			' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
		]);
	});

	condensed.find(j.JSXAttribute, { name: { name: 'condensed' } }).remove();

	// Handle icons
	const icons = getElementsWithOverrides(j, root, 'Button', 'icon');
	icons.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO svg icons are no longer adjusted in size, you will need to check that they are the proper size. ',
			' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
		]);
	});
}

export function updateDatePickerInput(j, root) {
	const inputs = getElementsWithOverrides(j, root, 'DatePickerInput', 'placement');

	inputs.forEach(ele => {
		const placementAttr = j(ele.value.openingElement)
			.find(j.JSXAttribute, { name: { name: 'placement' } })
			.at(0)
			.get().value.value;
		const placement =
			placementAttr.type === 'JSXExpressionContainer'
				? placementAttr.expression.value
				: placementAttr.value;

		if (ele.value.openingElement.selfClosing) {
			j(ele).replaceWith(
				j.jsxElement(
					j.jsxOpeningElement(
						j.jsxIdentifier('DatePickerInput'),
						ele.value.openingElement.attributes,
					),
					j.jsxClosingElement(j.jsxIdentifier('DatePickerInput')),
					ele.value.children,
				),
			);
		}

		const popoverConfig = j(ele).find(j.JSXElement, {
			openingElement: { name: { property: { name: 'Popover' } } },
		});

		const newPlacementAttr = j.jsxAttribute(
			j.jsxIdentifier('placement'),
			j.stringLiteral(placement),
		);

		if (!popoverConfig.length) {
			const hold = j.jsxElement(
				j.jsxOpeningElement(
					j.jsxMemberExpression(j.jsxIdentifier('DatePickerInput'), j.jsxIdentifier('Popover')),
					[newPlacementAttr],
					true,
				),
			);
			ele.value.children.push(hold);
		} else {
			const config = popoverConfig.at(0).get();
			const configPlacement = j(config).find(j.JSXAttribute, { name: { name: 'placement' } });
			if (!configPlacement.length) {
				console.log(config);
				config.value.openingElement.attributes.push(newPlacementAttr);
			}
		}

		j(ele.value.openingElement)
			.find(j.JSXAttribute, { name: { name: 'placement' } })
			.remove();
	});
}

// Update Dropdown -> Menu
export function updateMenus(j, root) {
	const filterComponents = ['Dropdown', 'DropdownToggle', 'DropdownMenu', 'MenuItem', 'Menu'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});

	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(x => !filterComponents.includes(x.local.name)),
						j.importSpecifier(j.identifier('Menu')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const dropdowns = root.findJSXElements('Dropdown');
	dropdowns.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu')),
				ele.value.children,
			),
		);
	});

	const dropdownToggles = root.findJSXElements('DropdownToggle');
	dropdownToggles.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Toggle'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Toggle')),
				ele.value.children,
			),
		);
	});

	const dropdownMenus = root.findJSXElements('DropdownMenu');
	dropdownMenus.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Dropdown'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Dropdown')),
				ele.value.children,
			),
		);
	});

	const menuItems = root.findJSXElements('MenuItem');
	menuItems.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Item'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Item')),
				ele.value.children,
			),
		);
	});

	const newDropdownToggles = root.find(j.JSXElement, {
		openingElement: { name: { object: { name: 'Dropdown' }, property: { name: 'Toggle' } } },
	});
	newDropdownToggles.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Toggle'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Toggle')),
				ele.value.children,
			),
		);
	});

	const newDropdownMenu = root.find(j.JSXElement, {
		openingElement: { name: { object: { name: 'Dropdown' }, property: { name: 'Menu' } } },
	});
	newDropdownMenu.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Dropdown'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Dropdown')),
				ele.value.children,
			),
		);
	});

	const newDropdownItem = root.find(j.JSXElement, {
		openingElement: { name: { object: { name: 'Dropdown' }, property: { name: 'Item' } } },
	});
	newDropdownItem.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Menu.Item'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Menu.Item')),
				ele.value.children,
			),
		);
	});
}

// Update LoadingSpinners
export function updateLoadingSpinners(j, root) {
	const loadingSpinners = root.findJSXElements('LoadingSpinner');

	loadingSpinners.forEach(ele => {
		const element = j(ele);
		const variant = element.find(j.JSXAttribute, { name: { name: 'variant' } });
		const sizeList = [
			['small', element.find(j.JSXAttribute, { name: { name: 'small' } })],
			['medium', element.find(j.JSXAttribute, { name: { name: 'medium' } })],
			['large', element.find(j.JSXAttribute, { name: { name: 'large' } })],
		];

		let hasAdded = !!variant.length;
		for (const [name, collection] of sizeList) {
			if (!hasAdded && collection.length) {
				ele.node.openingElement.attributes.unshift(
					j.jsxAttribute(j.jsxIdentifier('variant'), j.stringLiteral(name)),
				);
				hasAdded = true;
			}

			collection.remove();
		}
	});
}

// Update Modal
export function updateModal(j, root) {
	const filterComponents = ['ModalContent', 'ModalFooter', 'Modal'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});

	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(x => !filterComponents.includes(x.local.name)),
						j.importSpecifier(j.identifier('Modal')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const modalContents = root.findJSXElements('ModalContent');
	modalContents.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Modal.Content'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Modal.Content')),
				ele.value.children,
			),
		);
	});

	const modalFooters = root.findJSXElements('ModalFooter');
	modalFooters.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Modal.Footer'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Modal.Footer')),
				ele.value.children,
			),
		);
	});
}

// update parameterSentence
export function updateParameterSentence(j, root) {
	const filterComponents = ['ParameterSelect', 'ParameterInputBox', 'ParameterSentence'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});

	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(x => !filterComponents.includes(x.local.name)),
						j.importSpecifier(j.identifier('ParameterSentence')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const modalContents = root.findJSXElements('ParameterSelect');
	modalContents.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(
					j.jsxIdentifier('ParameterSentence.Select'),
					ele.value.openingElement.attributes,
				),
				j.jsxClosingElement(j.jsxIdentifier('ParameterSentence.Select')),
				ele.value.children,
			),
		);
	});

	const modalFooters = root.findJSXElements('ParameterInputBox');
	modalFooters.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(
					j.jsxIdentifier('ParameterSentence.Input'),
					ele.value.openingElement.attributes,
				),
				j.jsxClosingElement(j.jsxIdentifier('ParameterSentence.Input')),
				ele.value.children,
			),
		);
	});
}

// update popover
export function updatePopover(j, root) {
	const popovers = root.findJSXElements('PopoverManager');
	popovers.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO the structure of popovers has been changed. PopoverManager and PopoverReference are no longer used. ',
			' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
		]);
	});
}

export function updateTab(j, root) {
	const filterComponents = ['Tab', 'TabManager', 'TabList', 'TabPanels', 'TabPanel'];
	const stFilterComponents = ['SequencedTab', 'SequencedTabList'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});

	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		const newImports = [];
		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			newImports.push(j.importSpecifier(j.identifier('Tab')));
		}
		if (suiImport.value.specifiers.some(x => stFilterComponents.includes(x.local.name))) {
			newImports.push(j.importSpecifier(j.identifier('SequencedTab')));
		}
		if (newImports.length) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(
							x => !filterComponents.concat(stFilterComponents).includes(x.local.name),
						),
						...newImports,
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const tabManagers = root.findJSXElements('TabManager');
	tabManagers.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Tab.Manager'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Tab.Manager')),
				ele.value.children,
			),
		);
	});

	const tabLists = root.findJSXElements('TabList');
	tabLists.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Tab.List'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Tab.List')),
				ele.value.children,
			),
		);
	});

	const tabPanelss = root.findJSXElements('TabPanels');
	tabPanelss.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Tab.Panels'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Tab.Panels')),
				ele.value.children,
			),
		);
	});

	const tabPanels = root.findJSXElements('TabPanel');
	tabPanels.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Tab.Panel'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Tab.Panel')),
				ele.value.children,
			),
		);
	});

	const sequencedTabLists = root.findJSXElements('SequencedTabList');
	sequencedTabLists.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(
					j.jsxIdentifier('SequencedTab.List'),
					ele.value.openingElement.attributes,
				),
				j.jsxClosingElement(j.jsxIdentifier('SequencedTab.List')),
				ele.value.children,
			),
		);
	});
}

export function updateTextInputs(j, root) {
	const allImports = root.find(j.ImportDeclaration);
	const v5Imports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui/text-input' },
	});
	const v6Imports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui/text-input-v2' },
	});

	const hasMenuImports = !!v5Imports.find(j.ImportSpecifier, { imported: { name: 'Menu' } }).length;
	const hasMenuItemImports = !!v5Imports.find(j.ImportSpecifier, { imported: { name: 'MenuItem' } })
		.length;

	const todoComments = [
		j.commentLine(
			` TODO these imports are depricated and will need to be replaced by v6 components.`,
		),
		j.commentLine(
			` Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide.`,
		),
	];

	v5Imports.forEach(ele => {
		const element = j(ele);
		const nextImportIdx = allImports.nodes().findIndex(imp => imp === ele.node) + 1;
		console.log(nextImportIdx);
		if (nextImportIdx === allImports.length) {
			const hold = j.emptyStatement();
			console.log(hold);
			const existingComments = ele.value.comments || [];
			ele.value.comments = null;
			hold.comments = [
				...existingComments,
				...todoComments,
				j.commentLine(` ${element.toSource()}`),
			];
			element.replaceWith(hold);
		} else {
			const nextImport = allImports.at(nextImportIdx).get();
			const existingComments = ele.value.comments || [];
			ele.value.comments = null;
			nextImport.value.comments = [
				...existingComments,
				...todoComments,
				j.commentLine(` ${element.toSource()}`),
				...(nextImport.value.comments || []),
			];
			element.remove();
		}
	});

	v6Imports.forEach(ele => {
		ele.value.source.value = '@faithlife/styled-ui/text-input';
	});

	const typeaheads = root.findJSXElements('Typeahead');
	typeaheads.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO this component is depricated in favor of the `Select` component. ',
			' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
		]);
		commentOutElement(j, ele);
	});

	const asyncTypeaheads = root.findJSXElements('AsyncTypeahead');
	asyncTypeaheads.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO this component is depricated in favor of the `AsyncSelect` component. ',
			' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
		]);
		commentOutElement(j, ele);
	});

	const tokens = root.findJSXElements('Token');
	tokens.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO this component is depricated. ',
			' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
		]);
		commentOutElement(j, ele);
	});

	const menus = root.findJSXElements('Menu');
	if (hasMenuImports) {
		menus.forEach(ele => {
			addBlockComment(j, ele, [
				' TODO this component is depricated. ',
				' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
			]);
			commentOutElement(j, ele);
		});
	}

	const menuItems = root.findJSXElements('MenuItem');
	if (hasMenuItemImports) {
		menuItems.forEach(ele => {
			addBlockComment(j, ele, [
				' TODO this component is depricated. ',
				' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
			]);
			commentOutElement(j, ele);
		});
	}

	const inferredTypeaheads = root.findJSXElements('InferredTypeahead');
	inferredTypeaheads.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO this component is depricated in favor of the `InferredText` component. ',
			' Refer to the docs at https://faithlife.github.io/styled-ui/#/text-input/select ',
		]);
		commentOutElement(j, ele);
	});
}

export function updatePopoverExperimental(j, root) {
	const filterComponents = ['Popover', 'PopoverManager', 'PopoverReference'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});
	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(x => !filterComponents.includes(x.local.name)),
						j.importSpecifier(j.identifier('Popover')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const arrowFunctions = root.find(j.ArrowFunctionExpression);
	const functions = root.find(j.FunctionDeclaration);
	const classes = root.find(j.ClassBody);
	console.log(arrowFunctions, functions, classes);

	let shouldIncludeUseRef = false;
	arrowFunctions.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers);

			const returns = j(ele).find(j.ReturnStatement);
			if (!returns.length) {
				const expBody = ele.value.body;
				console.log('thisone', expBody);
				j(ele).replaceWith(
					j.arrowFunctionExpression(
						ele.value.params,
						j.blockStatement([j.returnStatement(expBody)]),
					),
				);
			}
			const expBody = ele.value.body.body;
			for (let i = 1; i < refCount; i++) {
				const refName = `popoverRef${i}`;
				const hold = j.variableDeclaration('const', [
					j.variableDeclarator(j.identifier(refName), j.identifier('useRef()')),
				]);
				expBody.unshift(hold);
			}
		}
	});

	functions.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers);

			const returns = j(ele).find(j.ReturnStatement);
			if (returns.length) {
				console.log(ele);
				const expBody = ele.value.body.body;
				for (let i = 1; i < refCount; i++) {
					const refName = `popoverRef${i}`;
					const hold = j.variableDeclaration('const', [
						j.variableDeclarator(j.identifier(refName), j.identifier('useRef()')),
					]);
					expBody.unshift(hold);
				}
			}
		}
	});

	classes.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers, true);

			console.log(ele);
			const expBody = ele.value.body;
			for (let i = 1; i < refCount; i++) {
				const refName = `_popoverRef${i}`;
				const hold = j.classProperty(
					j.identifier(refName),
					j.identifier('React.createRef()'),
					null,
				);
				expBody.unshift(hold);
			}
		}
	});

	if (shouldIncludeUseRef) {
		includeUseRef(j, root);
	}
}

// TODO make sure we are handling removed components

function includeUseRef(j, root) {
	const reactImport = root
		.find(j.ImportDeclaration, {
			source: { value: 'react' },
		})
		.at(0)
		.get();

	console.log(reactImport);

	if (!reactImport.value.specifiers.some(x => x.local && x.local.name === 'useRef')) {
		j(reactImport).replaceWith(
			j.importDeclaration(
				[...reactImport.value.specifiers, j.importSpecifier(j.identifier('useRef'))],
				j.literal('react'),
			),
		);
	}
}

function handleUpdatePopovers(j, popoverManagers, isClass = false) {
	let popoverRefCount = 1;
	popoverManagers.forEach(manEle => {
		const element = j(manEle);

		const popoverReference = element
			.findJSXElements('PopoverReference')
			.find(j.JSXElement)
			.at(0)
			.get();
		console.log(popoverReference);

		const refAttrs = j(popoverReference).find(j.JSXAttribute, { name: { name: 'ref' } });
		let refName;
		if (refAttrs.length) {
			refName = refAttrs.at(0).get().value.value.expression.name;
		} else {
			refName = `${isClass ? 'this._' : ''}popoverRef${popoverRefCount++}`;
			popoverReference.value.openingElement.attributes.push(
				j.jsxAttribute(j.jsxIdentifier('ref'), j.jsxExpressionContainer(j.identifier(refName))),
			);
		}
		console.log('refName', refName);

		console.log(popoverReference);
		element
			.findJSXElements('PopoverReference')
			.replaceWith(j.template.statement`${popoverReference.value}`);

		const popover = element
			.findJSXElements('Popover')
			.at(0)
			.get();
		const isOpenVal = element
			.findJSXElements('Popover')
			.find(j.JSXAttribute, { name: { name: 'isOpen' } })
			.at(0)
			.get().value.value.expression;
		console.log(isOpenVal);
		const onFocusAwaySearch = j(manEle.value.openingElement).find(j.JSXAttribute, {
			name: { name: 'onFocusAway' },
		});
		const onFocusAway = onFocusAwaySearch.length
			? onFocusAwaySearch.at(0).get().value.value
			: j.jsxExpressionContainer(j.identifier('() => {}'));
		popover.value.openingElement.attributes = [
			...popover.value.openingElement.attributes.filter(x => x.name.name !== 'isOpen'),
			j.jsxAttribute(j.jsxIdentifier('reference'), j.jsxExpressionContainer(j.identifier(refName))),
			j.jsxAttribute(j.jsxIdentifier('onFocusAway'), onFocusAway),
		];

		element.insertBefore(popoverReference.value);
		const popoverComponent = element.findJSXElements('Popover');
		popoverComponent.replaceWith(
			path => j.template.statement`{${isOpenVal} && (${j(path).toSource()})}`,
		);
		element.replaceWith(popoverComponent.at(0).get().value);
	});
	return popoverRefCount;
}

function commentOutElement(j, ele) {
	const element = j(ele);
	const newEmpty = j.jsxEmptyExpression();
	newEmpty.comments = [j.commentBlock(element.toSource())];
	element.replaceWith(j.jsxExpressionContainer(newEmpty));
}

function getPropAsObj(j, propName, element) {
	const propElement = j(element)
		.find(j.JSXAttribute, {
			name: { name: propName },
		})
		.find(j.ObjectExpression)
		.at(0)
		.get();
	const eleAsString = j(propElement).toSource();
	const sanitizedString = eleAsString
		.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":')
		.replaceAll(`'`, `"`);

	return JSON.parse(sanitizedString);
}

function getElementsWithOverrides(j, root, eleName, overrideName) {
	return root.find(
		j.JSXElement,
		ele =>
			ele.openingElement.name.name === eleName &&
			ele.openingElement.attributes.some(x => x.name.name === overrideName),
	);
}

function addTodoComments(j, elements, todoAttrName) {
	elements.forEach(ele => {
		const element = j(ele);
		const styleOverrides = getPropAsObj(j, todoAttrName, ele);

		addBlockComment(j, ele, [
			` TODO use styled-system props and config children to replace ${todoAttrName}. `,
			' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
			` ${JSON.stringify(styleOverrides)} `,
		]);

		element.find(j.JSXAttribute, { name: { name: todoAttrName } }).remove();
	});
}

function addBlockComment(j, ele, comments) {
	const element = j(ele);
	const lineBreak = j.jsxText('\n');
	for (const comment of comments) {
		const commentContent = j.jsxEmptyExpression();
		commentContent.comments = [j.commentBlock(comment, false, true)];
		element.insertBefore(j.jsxExpressionContainer(commentContent));
		element.insertBefore(lineBreak);
	}
}
