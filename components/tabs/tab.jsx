import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from '../icons/12px';
import * as Styled from './styled.jsx';

export function Tab({ children, index, selected, onSelectTab, disabled, panelId, ...props }) {
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
		<Styled.TabCore
			ref={tabRef}
			disabled={disabled}
			onClick={handleSelectTab}
			selected={selected}
			panelId={panelId || ''}
			{...props}
		>
			{typeof children === 'function' ? children({ selected, disabled }) : children}
		</Styled.TabCore>
	);
}

Tab.propTypes = {
	/** The tab's label */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
};

Tab.defaultProps = {
	styleOverrides: {},
};

export function SequencedTab({
	children,
	disabled,
	completed,
	index,
	selected,
	onSelectTab,
	panelId,
	...props
}) {
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
				{completed ? <Checkmark color="white" /> : index + 1}
			</Styled.Circle>
			<Styled.SequencedTabContent
				ref={tabRef}
				disabled={disabled}
				selected={selected}
				fontSize={3}
				paddingX={5}
				paddingY={3}
				{...props}
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
	/** The user should always be shown this tab even though it's been externally completed. */
	completed: PropTypes.bool,
};
