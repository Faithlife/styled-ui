import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SmallCheck } from '../icons';
import * as Styled from './styled.jsx';

export function Tab(props) {
	// PropType linting is diabled so out hidden props can be destuctured along with own consumer props
	/* eslint-disable react/prop-types */
	const {
		children,
		disabled,
		styleOverrides,
		index,
		selected,
		onSelectTab,
		theme,
		panelId,
	} = props;
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
				disabled={disabled}
				theme={theme}
				styleOverrides={styleOverrides}
				selected={selected}
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

export function SequencedTab(props) {
	// PropType linting is diabled so out hidden props can be destuctured along with own consumer props
	/* eslint-disable react/prop-types */
	const {
		children,
		disabled,
		completed,
		styleOverrides,
		index,
		selected,
		onSelectTab,
		theme,
		panelId,
	} = props;
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
		<Styled.SequencedTab
			disabled={disabled}
			panelId={panelId || ''}
			selected={selected}
			onClick={handleSelectTab}
		>
			<Styled.Circle selected={selected} completed={completed} disabled={disabled}>
				{completed ? <SmallCheck /> : index + 1}
			</Styled.Circle>
			<Styled.SequencedTabContent
				ref={tabRef}
				disabled={disabled}
				theme={theme}
				styleOverrides={styleOverrides}
				selected={selected}
			>
				{typeof children === 'function' ? children({ selected, disabled }) : children}
			</Styled.SequencedTabContent>
		</Styled.SequencedTab>
	);
}

SequencedTab.propTypes = {
	/** The tab's label */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
	completed: PropTypes.bool,
};
