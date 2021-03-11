// Update listbox to v6 and change name

module.exports = function(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const filterComponents = ['Listbox', 'ListboxToggle', 'ListboxMenu', 'ListItem'];
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
						j.importSpecifier(j.identifier('Listbox')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const listboxToggles = root.findJSXElements('ListboxToggle');
	listboxToggles.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Listbox.Toggle'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Listbox.Toggle')),
				ele.value.children,
			),
		);
	});

	const listboxMenus = root.findJSXElements('ListboxMenu');
	listboxMenus.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(
					j.jsxIdentifier('Listbox.Dropdown'),
					ele.value.openingElement.attributes,
				),
				j.jsxClosingElement(j.jsxIdentifier('Listbox.Dropdown')),
				ele.value.children,
			),
		);
	});

	const listItems = root.findJSXElements('ListItem');
	listItems.forEach(ele => {
		j(ele).replaceWith(
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier('Listbox.Option'), ele.value.openingElement.attributes),
				j.jsxClosingElement(j.jsxIdentifier('Listbox.Option')),
				ele.value.children,
			),
		);
	});

	return root.toSource(printOptions);
};
