import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../shared-styles';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

export function Tooltip({ children, theme, text, placement, ...tooltipProps }) {
	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.TooltipDiv,
		Styled.variationMap,
		{ ...tooltipProps, ...(placement && { [placement]: true }) },
	);

	return (
		<Styled.TooltipContainer>
			<MappedStyledComponent theme={theme} {...filteredProps || {}}>
				{text}
			</MappedStyledComponent>
			{children}
		</Styled.TooltipContainer>
	);
}

Tooltip.propTypes = {
	/** Toggles the tooltip visible/ non-visible */
	isOpen: PropTypes.bool,
	/** Toogles whether the arrow is visible */
	hideArrow: PropTypes.bool,
	/** Hide tooltip when hovering over content */
	autoHide: PropTypes.bool,
	/** Tooltip text */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** See the docs for how to override styles properly */
	className: PropTypes.string,
	/** Set alternate width */
	width: PropTypes.string,
	/** Optional Theme */
	theme: PropTypes.shape({
		backgroundColor: PropTypes.string,
		textColor: PropTypes.string,
		boxShadow: PropTypes.string,
	}),
	/** What the tooltip is for */
	children: PropTypes.node.isRequired,
	/** Change the show/hide delays */
	delay: PropTypes.oneOfType([
		PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
		PropTypes.number,
	]),
	/** Placement of the tooltip */
	placement: PropTypes.oneOf([
		'top',
		'top-start',
		'top-end',
		'right',
		'right-start',
		'right-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end',
	]),
	/** Offset of tooltip from item */
	offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Show tooltip on right */
	right: PropTypes.bool,
	/** Show tooltip on left */
	left: PropTypes.bool,
	/** Show tooltip on bottom */
	bottom: PropTypes.bool,
};

Tooltip.defaultProps = {
	theme: {
		backgroundColor: colors.gray14,
		textColor: colors.Black,
		shadow: 'none',
	},
	width: 'max-content',
	isOpen: false,
	hideArrow: false,
	delay: {
		show: 0.15,
		hide: 0.075,
	},
	autoHide: true,
	offset: 8,
};
