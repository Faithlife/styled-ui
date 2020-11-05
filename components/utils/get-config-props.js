import React from 'react';

export function getConfigProps(children, name) {
	const childrenList = React.Children.toArray(children);
	return childrenList.find(child => child.type.childConfigComponent === name)?.props ?? {};
}

/**
 * Returns a tuple of the item or null if it doesn't exist and an array of all children with the found child filtered out.
 * [configItem, filteredChildrenList]
 */
export function getConfigChild(children, name) {
	const childrenList = Array.isArray(children) ? children : React.Children.toArray(children);
	const childIndex = childrenList.findIndex(child => child.type?.childConfigComponent === name);
	return childIndex !== -1
		? [childrenList[childIndex], childrenList.filter((_, index) => index !== childIndex)]
		: [null, children];
}
