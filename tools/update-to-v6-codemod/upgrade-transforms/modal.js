// Update Modal to v6

const {} = require('./utils');

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

	return root.toSource();
};
