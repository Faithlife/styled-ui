// Add todo to popovers

const { addBlockComment } = require('./utils');

module.exports = function(j, api, options) {
	if (!options.experimental) {
		return popover(j, api, options);
	} else {
		return popoverExperimental(j, api, options);
	}
};

function popover(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const popovers = root.findJSXElements('PopoverManager');
	popovers.forEach(ele => {
		addBlockComment(j, ele, [
			' TODO the structure of popovers has been changed. PopoverManager and PopoverReference are no longer used. ',
			' Refer to the upgrade docs at https://faithlife.github.io/styled-ui/#/upgrade-guide. ',
		]);
	});

	return root.toSource(printOptions);
}

function popoverExperimental(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const filterComponents = ['Popover', 'PopoverManager', 'PopoverReference'];
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
						j.importSpecifier(j.identifier('Popover')),
					],
					j.literal('@faithlife/styled-ui'),
				),
			);
		}
	}

	const arrowFunctions = root.find(j.ArrowFunctionExpression);
	const functions = root.find(j.FunctionDeclaration);
	const classes = root.find(j.ClassBody);

	let shouldIncludeUseRef = false;
	arrowFunctions.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers);

			const returns = j(ele).find(j.ReturnStatement);
			if (!returns.length) {
				const expBody = ele.value.body;
				j(ele).replaceWith(
					j.arrowFunctionExpression(
						ele.value.params,
						j.blockStatement([j.returnStatement(expBody)]),
					),
				);
			}
			const expBody = ele.value.body.body;
			for (let i = 1; i < refCount; i++) {
				const refName = `popoverRef${i}`;
				const hold = j.variableDeclaration('const', [
					j.variableDeclarator(j.identifier(refName), j.identifier('useRef()')),
				]);
				expBody.unshift(hold);
			}
		}
	});

	functions.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers);

			const returns = j(ele).find(j.ReturnStatement);
			if (returns.length) {
				const expBody = ele.value.body.body;
				for (let i = 1; i < refCount; i++) {
					const refName = `popoverRef${i}`;
					const hold = j.variableDeclaration('const', [
						j.variableDeclarator(j.identifier(refName), j.identifier('useRef()')),
					]);
					expBody.unshift(hold);
				}
			}
		}
	});

	classes.forEach(ele => {
		const popoverManagers = j(ele).findJSXElements('PopoverManager');
		if (popoverManagers.length) {
			shouldIncludeUseRef = true;
			const refCount = handleUpdatePopovers(j, popoverManagers, true);

			const expBody = ele.value.body;
			for (let i = 1; i < refCount; i++) {
				const refName = `_popoverRef${i}`;
				const hold = j.classProperty(
					j.identifier(refName),
					j.identifier('React.createRef()'),
					null,
				);
				expBody.unshift(hold);
			}
		}
	});

	if (shouldIncludeUseRef) {
		includeUseRef(j, root);
	}

	return root.toSource(printOptions);
}

function includeUseRef(j, root) {
	const reactImport = root
		.find(j.ImportDeclaration, {
			source: { value: 'react' },
		})
		.at(0)
		.get();

	if (!reactImport.value.specifiers.some(x => x.local && x.local.name === 'useRef')) {
		j(reactImport).replaceWith(
			j.importDeclaration(
				[...reactImport.value.specifiers, j.importSpecifier(j.identifier('useRef'))],
				j.literal('react'),
			),
		);
	}
}

function handleUpdatePopovers(j, popoverManagers, isClass = false) {
	let popoverRefCount = 1;
	popoverManagers.forEach(manEle => {
		const element = j(manEle);

		const popoverReference = element
			.findJSXElements('PopoverReference')
			.find(j.JSXElement)
			.at(0)
			.get();

		const refAttrs = j(popoverReference).find(j.JSXAttribute, { name: { name: 'ref' } });
		let refName;
		if (refAttrs.length) {
			refName = refAttrs.at(0).get().value.value.expression.name;
		} else {
			refName = `${isClass ? 'this._' : ''}popoverRef${popoverRefCount++}`;
			popoverReference.value.openingElement.attributes.push(
				j.jsxAttribute(j.jsxIdentifier('ref'), j.jsxExpressionContainer(j.identifier(refName))),
			);
		}
		element
			.findJSXElements('PopoverReference')
			.replaceWith(j.template.statement`${popoverReference.value}`);

		const popover = element
			.findJSXElements('Popover')
			.at(0)
			.get();
		const isOpenVal = element
			.findJSXElements('Popover')
			.find(j.JSXAttribute, { name: { name: 'isOpen' } })
			.at(0)
			.get().value.value.expression;

		const onFocusAwaySearch = j(manEle.value.openingElement).find(j.JSXAttribute, {
			name: { name: 'onFocusAway' },
		});
		const onFocusAway = onFocusAwaySearch.length
			? onFocusAwaySearch.at(0).get().value.value
			: j.jsxExpressionContainer(j.identifier('() => {}'));
		popover.value.openingElement.attributes = [
			...popover.value.openingElement.attributes.filter(x => x.name.name !== 'isOpen'),
			j.jsxAttribute(j.jsxIdentifier('reference'), j.jsxExpressionContainer(j.identifier(refName))),
			j.jsxAttribute(j.jsxIdentifier('onFocusAway'), onFocusAway),
		];

		element.insertBefore(popoverReference.value);
		const popoverComponent = element.findJSXElements('Popover');
		popoverComponent.replaceWith(
			path => j.template.statement`{${isOpenVal} && (${j(path).toSource()})}`,
		);
		element.replaceWith(popoverComponent.at(0).get().value);
	});
	return popoverRefCount;
}
