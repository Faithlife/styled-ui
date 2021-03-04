// Replace removed components when possible otherwise leave a comment with an update plan

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const filterComponents = ['AnchorButton', 'Button'];
	const suiImports = root.find(j.ImportDeclaration, {
		source: { value: '@faithlife/styled-ui' },
	});
	if (suiImports.length) {
		const suiImport = suiImports.at(0).get();
		const anchorButtons = root.findJSXElements('AnchorButton');

		if (suiImport.value.specifiers.some(x => filterComponents.includes(x.local.name))) {
			j(suiImport).replaceWith(
				j.importDeclaration(
					[
						...suiImport.value.specifiers.filter(x => !filterComponents.includes(x.local.name)),
						j.importSpecifier(j.identifier('Button')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);

			anchorButtons.forEach(ele => {
				const openingElement = ele.value.openingElement;
				j(ele).replaceWith(
					j.jsxElement(
						j.jsxOpeningElement(j.jsxIdentifier('Button'), [
							j.jsxAttribute(j.jsxIdentifier('as'), j.stringLiteral('a')),
							...openingElement.attributes,
						]),
						ele.value.closingElement ? j.jsxClosingElement(j.jsxIdentifier('Button')) : null,
						ele.value.children,
					),
				);
			});
		}
	}

	return root.toSource();
};
