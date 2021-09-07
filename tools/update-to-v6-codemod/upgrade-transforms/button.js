// update Button to v6

const { getElementsWithOverrides, addBlockComment } = require('./utils');

module.exports = function(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

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
			' TODO the `condensed` prop has been removed and the padding will need to be manually adjusted. ',
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

	return root.toSource(printOptions);
};
