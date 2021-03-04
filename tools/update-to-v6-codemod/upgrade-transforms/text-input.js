// Comment out and suggest upgrades for depricated text inputs

const { addBlockComment, commentOutElement } = require('./utils');

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

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
		if (nextImportIdx === allImports.length) {
			const hold = j.emptyStatement();
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

	return root.toSource();
};
