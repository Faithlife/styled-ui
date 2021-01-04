import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes, { propType as styledSystemPropType } from '@styled-system/prop-types';
import { common, typography } from '../../theme/system';
import { Text } from '../Text';
import { Checkmark } from '../icons/12px';
import * as Styled from './styled.jsx';

/** A styled label/button that switches the view to a particular panel of content. */
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
	/** The tab's label. */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
	textStyle: styledSystemPropType,
	...common.propTypes,
	...typography.propTypes,
	...styledSystemPropTypes.layout,
	...styledSystemPropTypes.position,
	...styledSystemPropTypes.border,
	...styledSystemPropTypes.background,
};

/**
 * A specialized tab interface that keeps track of tasks to be completed in a sequence. May be
 * paired with `TabPanel` content or used alone.
 */
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
	/** The tab's label. */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
	/**
	 * Whether this tab's task has already been completed externally. Note: when a user progresses in
	 * sequence to an externally completed tab, the tab should still be shown, not skipped over.
	 */
	completed: PropTypes.bool,
	...Text.propTypes,
};
