import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { mediaSizes } from '../shared-styles';
import { Popover } from './component';
import { PopoverManager, PopoverReference } from './popper-helpers';

/** Simple tooltip that uses popovers internally. Does not support custom positioning. */
export function Tooltip(props) {
	const { children, text, content, isOpen, ...otherProps } = props;
	const [tooltipIsOpen, setToolTipIsOpen] = useState(false);
	const [isOnMobile, setIsOnMobile] = useState(false);

	const handleMouseEnter = () => {
		handleMouseLeave.cancel();
		setToolTipIsOpen(true);
	};

	const handleMouseLeave = debounce(() => {
		setToolTipIsOpen(false);
	}, 200);

	useEffect(() => {
		setIsOnMobile(window.matchMedia(`(max-width: ${mediaSizes.tablet})`).matches);
		return () => {
			handleMouseLeave.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PopoverManager>
			<PopoverReference
				style={{ display: isOnMobile && 'none' }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => setToolTipIsOpen(false)}
			>
				{children}
			</PopoverReference>
			<Popover {...otherProps} isOpen={tooltipIsOpen || isOpen}>
				{content || text}
			</Popover>
		</PopoverManager>
	);
}

Tooltip.propTypes = {
	...Popover.propTypes,

	/** Content for the tooltip */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** Text for the tooltip (deprecated) */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
