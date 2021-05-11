// Update ParameterSentence to v6

module.exports = function(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

	return root.toSource(printOptions);
};
