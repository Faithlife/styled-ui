import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export function Tab({ children, disabled, ...otherProps }) {
	const { index, selected, onSelectTab, theme, styleOverrides } = otherProps;
	const tabRef = useRef();

	useEffect(
		() => {
			if (selected && tabRef.current) {
				tabRef.current.focus();
			}
		},
		[selected, tabRef.current],
	);

	const handleSelectTab = useCallback(
		() => {
			onSelectTab(index);
		},
		[onSelectTab, index],
	);

	return (
		<Styled.Tab disabled={disabled} index={index} selected={selected} onClick={handleSelectTab}>
			<Styled.TabContent
				ref={tabRef}
				disabled={disabled}
				theme={theme}
				styleOverrides={styleOverrides}
				selected={selected}
			>
				{children}
			</Styled.TabContent>
		</Styled.Tab>
	);
}

Tab.propTypes = {
	/** What will be displayed on the tab, usually text */
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
};
