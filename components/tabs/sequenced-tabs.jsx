import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { SmallCheck } from '../icons';
import { useTabContext } from './tab-utils';
import * as Styled from './styled';

const handledKeys = {
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
};

export function SequencedTabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap } = useTabContext();

	const [touchedTabs, setTouchedTabs] = useState(new Set());

	useEffect(() => {
		setTouchedTabs(touchedTabs => new Set(touchedTabs).add(selectedTabIndex));
	}, [selectedTabIndex]);

	const handleKeyboardNav = useSequencedKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.SequencedTabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							disabled:
								!touchedTabs.has(index) &&
								(child.props.disabled ||
									(selectedTabIndex < index - 1 &&
										!children
											.slice(selectedTabIndex + 1, index)
											.every(value => value.props.disabled))),
							completed:
								selectedTabIndex !== index &&
								(touchedTabs.has(index) ||
									(child.props.disabled
										? false
										: child.props.completed || selectedTabIndex > index)),
							onSelectTab,
							index,
							panelId: panelIdsMap[index],
					  })
					: null,
			)}
		</Styled.SequencedTabList>
	);
}

SequencedTabList.propTypes = {
	children: PropTypes.node.isRequired,
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
				{completed ? <SmallCheck /> : index + 1}
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

function useSequencedKeyboardNav(selectedIndex, onSelectTab, children) {
	const currentChildren = useRef();

	useEffect(() => {
		currentChildren.current = children;
	}, [children]);

	const handleKeyboardNav = useCallback(
		event => {
			const enabledTabIndexes = React.Children.map(currentChildren.current, (child, index) =>
				!child || child.props.disabled ? null : index,
			).filter(index => index !== null);
			const currentEnabledIndex = enabledTabIndexes.indexOf(selectedIndex);

			switch (event.key) {
				case handledKeys.arrowRight: {
					const nextEnabledIndex =
						currentEnabledIndex === enabledTabIndexes.length - 1
							? currentEnabledIndex
							: currentEnabledIndex + 1;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.arrowLeft: {
					const nextEnabledIndex =
						currentEnabledIndex === 0 ? currentEnabledIndex : currentEnabledIndex - 1;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.home: {
					onSelectTab(enabledTabIndexes[0]);
					break;
				}
				case handledKeys.end: {
					onSelectTab(enabledTabIndexes[enabledTabIndexes.length - 1]);
					break;
				}
				default:
					return;
			}
		},
		[selectedIndex, onSelectTab],
	);

	return handleKeyboardNav;
}
