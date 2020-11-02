import React from 'react';

export function getConfigProps(children, name) {
	const childrenList = React.Children.toArray(children);
	return childrenList.find(child => child.type.childConfigComponent === name)?.props ?? {};
}

export function getConfigChild(children, name) {
	const childrenList = React.Children.toArray(children);
	return childrenList.find(child => child.type?.childConfigComponent === name);
}
