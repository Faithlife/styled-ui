import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { system } from 'styled-system';
import { resetStyles } from '../utils';
import { Text } from '../Text';

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
		<TabButton
			disabled={disabled}
			panelId={panelId || ''}
			selected={selected}
			onClick={handleSelectTab}
		>
			<TabContent
				ref={tabRef}
				selected={selected}
				display="inline-block"
				width={styleOverrides.width}
				minHeight="fit-content"
				paddingY={3}
				paddingX={5}
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
			</TabContent>
		</TabButton>
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

const TabButton = styled.button.attrs({
	role: 'tab',
	'aria-selected': ({ selected }) => selected,
	'aria-controls': ({ panelId }) => `panel:${panelId}`,
	'aria-disabled': ({ disabled }) => disabled,
	tabIndex: ({ selected }) => (selected ? '0' : '-1'),
})`
	${resetStyles};

	box-shadow: none;
	outline: none;
	background: white;
	border: none;
	display: inline-block;
	padding: 0;
	transition: all 0.25s ease 0s;
	border: 0;
	border-radius: 3px 3px 0 0;

	position: relative;

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		outline: none;
	}
`;

const TabContent = styled(Text)`
	&:focus {
		${system({ focusOutline: { property: 'outline' } })};
	}

	&::before {
		${system({ beforeBorderColor: { property: 'border-color', scale: 'colors' } })};
		${system({ beforeBackgroundColor: { property: 'background-color', scale: 'colors' } })};
	}

	&::after {
		${system({ afterBackgroundColor: { property: 'background-color', scale: 'colors' } })};
	}

	${({ selected }) => selected && selectedTab};
`;

const selectedTab = css`
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;

		border-right: 1px solid;
		border-left: 1px solid;
		border-radius: 3px 3px 0 0;
	}

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1px;
		width: calc(100% - 2px);
		height: 1px;
	}
`;
