// Update tabs to v6

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

	return root.toSource();
};
