// Update dropdown/ menus to v6 and change name

module.exports = function(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

	return root.toSource(printOptions);
};
