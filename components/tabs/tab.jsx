import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export function Tab(props) {
	// PropType linting is diabled so out hidden props can be destuctured along with own consumer props
	/* eslint-disable react/prop-types */
	const { children, disabled, styleOverrides, index, selected, onSelectTab, panelId } = props;
	const tabRef = useRef();

	useEffect(() => {
		if (selected && tabRef.current) {
			tabRef.current.focus();
		}
	}, [selected]);

	const handleSelectTab = useCallback(() => {
		onSelectTab(index);
	}, [onSelectTab, index]);

	return (
		<Styled.Tab
			disabled={disabled}
			panelId={panelId || ''}
			selected={selected}
			onClick={handleSelectTab}
		>
			<Styled.TabContent
				ref={tabRef}
				selected={selected}
				display="inline-block"
				width={styleOverrides.width}
				minHeight="fit-content"
				py={3}
				px={5}
				padding={styleOverrides.padding && styleOverrides.padding}
				borderRight={selected ? 1 : ''}
				borderLeft={selected ? 1 : ''}
				borderColor={selected ? 'gray14' : ''}
				beforeBorderColor={selected ? 'blue4' : ''}
				focusOutline="none"
				color={disabled ? 'gray52' : ''}
				backgroundColor={selected ? 'white' : 'gray4'}
				beforeBackgroundColor={selected ? 'blue4' : ''}
				afterBackgroundColor={selected ? 'white' : ''}
				textStyle={styleOverrides.fontSize || 'h16'}
				fontWeight={selected ? 'semibold' : 'regular'}
				css={{ cursor: 'pointer' }}
			>
				{typeof children === 'function' ? children({ selected, disabled }) : children}
			</Styled.TabContent>
		</Styled.Tab>
	);
}

Tab.propTypes = {
	/** The tab's label */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		width: PropTypes.string,
		padding: PropTypes.string,
	}),
};

Tab.defaultProps = {
	styleOverrides: {},
};
