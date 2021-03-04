// Update loading spinners to v6

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

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

	return root.toSource();
};
