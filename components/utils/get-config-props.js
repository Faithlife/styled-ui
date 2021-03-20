import React from 'react';

/**
 * Retrieves the props from a child component specified by name.
 *
 * @param {React.ReactNode} children - The parent component's `children` prop.
 * @param {string} name - The name of the child component to search for.
 * @returns {object} The props object of the specified child component (or an empty object if it wasn't found).
 */
export function getConfigProps(children, name) {
	const childrenList = React.Children.toArray(children);
	console.log(childrenList);
	return childrenList.find(child => child.type?.childConfigComponent === name)?.props ?? {};
}

/**
 * Finds a child component by name and separates it from the parent component's other children.
 *
 * @param {React.ReactNode} children - The parent component's `children` prop.
 * @param {string} name - The name of the child component to search for.
 * @returns {[(React.ReactElement|null), React.ReactNode]} A tuple of the found child component (or `null` if it wasn't found) and an object of the remaining children.
 */
export function getConfigChild(children, name) {
	const childrenList = Array.isArray(children) ? children : React.Children.toArray(children);
	const childIndex = childrenList.findIndex(child => child.type?.childConfigComponent === name);
	return childIndex !== -1
		? [childrenList[childIndex], childrenList.filter((_, index) => index !== childIndex)]
		: [null, children];
}
