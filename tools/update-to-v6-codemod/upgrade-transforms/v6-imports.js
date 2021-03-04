// Update all v6 imports to the base entry

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

		baseImports.remove();
		v6Imports.remove();
	}

	return root.toSource();
};
