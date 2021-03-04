module.exports = {
	commentOutElement: (j, ele) => {
		const element = j(ele);
		const newEmpty = j.jsxEmptyExpression();
		newEmpty.comments = [j.commentBlock(element.toSource())];
		element.replaceWith(j.jsxExpressionContainer(newEmpty));
	},

	getPropAsObj: getPropAsObj,

	getElementsWithOverrides: (j, root, eleName, overrideName) => {
		return root.find(
			j.JSXElement,
			ele =>
				ele.openingElement.name.name === eleName &&
				ele.openingElement.attributes.some(x => x.name.name === overrideName),
		);
	},

	addTodoComments: (j, elements, todoAttrName) => {
		elements.forEach(ele => {
			const element = j(ele);
			const styleOverrides = getPropAsObj(j, todoAttrName, ele);

			addBlockComment(j, ele, [
				` TODO use styled-system props and config children to replace ${todoAttrName}. `,
				' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
				` ${JSON.stringify(styleOverrides)} `,
			]);

			element.find(j.JSXAttribute, { name: { name: todoAttrName } }).remove();
		});
	},

	addBlockComment: addBlockComment,
};

function addBlockComment(j, ele, comments) {
	const element = j(ele);
	const lineBreak = j.jsxText('\n');
	for (const comment of comments) {
		const commentContent = j.jsxEmptyExpression();
		commentContent.comments = [j.commentBlock(comment, false, true)];
		element.insertBefore(j.jsxExpressionContainer(commentContent));
		element.insertBefore(lineBreak);
	}
}

function getPropAsObj(j, propName, element) {
	const propElement = j(element)
		.find(j.JSXAttribute, {
			name: { name: propName },
		})
		.find(j.ObjectExpression)
		.at(0)
		.get();
	const eleAsString = j(propElement).toSource();
	const sanitizedString = eleAsString
		.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":')
		.replaceAll(`'`, `"`);

	return JSON.parse(sanitizedString);
}
