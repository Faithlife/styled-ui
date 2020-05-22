import React, { Component, useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { deprecate } from '../utils/deprecate';
import { mergeRefs } from '../utils/merge-refs';
import { Box } from '../Box';
import { useFocusAwayHandler } from '../shared-hooks';
import {
	PopoverContext,
	PlacementOptionsProps,
	arrowWidth,
	maxWidth,
	maxHeight,
	margins,
	getPlacement,
	arrowStyles,
} from './popper-helpers';

/** Positioning helper used to display content above another element.
 *  Refs are not supported, please use PopoverManager and PopoverReference to handle positioning.
 */
export class PopoverBase extends Component {
	static propTypes = {
		/** Is the popover open */
		isOpen: PropTypes.bool,
		/** Where on the target the popover renders */
		placement: PlacementOptionsProps,
		/** Refer to https://popper.js.org/docs/v2/modifiers/ for further documentation */
		modifiers: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				enabled: PropTypes.bool,
				phase: PropTypes.string,
				fn: PropTypes.func,
				options: PropTypes.object,
				data: PropTypes.object,
			}),
		),
		/** Contents of the Popover */
		children: PropTypes.node,
		/** Where to inject the popover. Defaults to inline */
		container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
		/** Hide popover arrow */
		hideArrow: PropTypes.bool,
		/** Delay on popover showing in milliseconds*/
		delay: PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
		positionFixed: PropTypes.bool,
		styleOverrides: PropTypes.shape({
			background: PropTypes.string,
			border: PropTypes.string,
			borderRadius: PropTypes.string,
			hideShadow: PropTypes.bool,
			fontSize: PropTypes.string,
			fontWeight: PropTypes.string,
			height: PropTypes.string,
			lineHeight: PropTypes.string,
			margin: PropTypes.string,
			maxHeight: PropTypes.string,
			maxWidth: PropTypes.string,
			minHeight: PropTypes.string,
			minWidth: PropTypes.string,
			outline: PropTypes.string,
			padding: PropTypes.string,
			textAlign: PropTypes.string,
			width: PropTypes.string,
			zIndex: PropTypes.number,
		}),
	};

	static defaultProps = {
		placement: 'top',
		modifiers: [],
		styleOverrides: {},
	};

	state = {
		showPopper: this.props.isOpen || false,
	};

	_timeout = null;

	componentDidMount() {
		deprecate('Popover v1 is deprecated, please migrate to popover v2');
		const { container } = this.props;
		if (container) {
			if (typeof container === 'string') {
				// must be an id or body
				this.targetContainer =
					container === 'body' ? document.body : document.getElementById(container);
			} else {
				// must be a ref
				this.targetContainer = typeof container === 'object' ? container.current : container();
			}
		}
	}

	componentDidUpdate(prevProps) {
		this.handleIsPopoverShowing(prevProps.isOpen, this.props.isOpen, this.props.delay);
	}

	componentWillUnmount() {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
	}

	handleIsPopoverShowing = (prevIsOpen, isOpen, delay) => {
		if (prevIsOpen !== isOpen && !delay) {
			this.setState({ showPopper: isOpen });
		} else if (prevIsOpen && !isOpen && !!delay) {
			if (this._timeout) {
				clearTimeout(this._timeout);
			}
			this._timeout = setTimeout(() => {
				this.setState({ showPopper: false });
				this._timeout = null;
			}, delay.hide || 0);
		} else if (!prevIsOpen && isOpen && !!delay) {
			if (this._timeout) {
				clearTimeout(this._timeout);
			}
			this._timeout = setTimeout(() => {
				this.setState({ showPopper: true });
				this._timeout = null;
			}, delay.show || 0);
		}
	};

	render() {
		const { showPopper } = this.state;

		if (!!this.targetContainer && showPopper) {
			return ReactDOM.createPortal(<PopoverCore {...this.props} />, this.targetContainer);
		}

		if (showPopper) {
			return <PopoverCore {...this.props} />;
		}

		return null;
	}
}

function PopoverCore({
	children,
	placement: popoverPlacement,
	hideArrow,
	delay,
	theme,
	modifiers,
	styleOverrides,
	eventsEnabled,
	positionFixed,
	...rest
}) {
	const { reference, onFocusAway } = useContext(PopoverContext);
	const focusRef = useFocusAwayHandler(reference.current, onFocusAway);

	const popperModifiers = [];
	if (modifiers instanceof Array) {
		popperModifiers.push(...modifiers);
	} else {
		deprecate(
			'v1 style modifiers detected, please update to v2: https://popper.js.org/docs/v2/modifiers/',
		);
	}

	popperModifiers.push({ name: 'computeStyle', options: { gpuAcceleration: false } });

	return (
		<Popper
			placement={popoverPlacement}
			modifiers={popperModifiers}
			strategy={positionFixed ? 'fixed' : 'absolute'}
		>
			{({ ref, style, placement, arrowProps }) => (
				<Box
					ref={mergeRefs(ref, focusRef)}
					placement={placement}
					style={{
						...style,
						...(!hideArrow ? margins[getPlacement(placement)] : {}),
					}}
					delay={delay}
					hideArrow={hideArrow}
					backgroundColor={theme?.backgroundColor ?? 'popover.background'}
					border={styleOverrides.border ?? 'none'}
					borderRadius={styleOverrides.borderRadius ?? 0}
					boxShadow={styleOverrides.hideShadow ? 0 : 1}
					color={theme?.textColor ?? ''}
					fontSize={styleOverrides.fontSize ?? 'medium'}
					fontWeight={styleOverrides.fontWeight ?? 'normal'}
					height={styleOverrides.height ?? 'auto'}
					lineHeight={styleOverrides.lineHeight ?? 'normal'}
					margin={styleOverrides.margin ?? 0}
					maxHeight={styleOverrides.maxHeight ?? maxHeight}
					maxWidth={styleOverrides.maxWidth ?? maxWidth}
					minHeight={styleOverrides.minHeight ?? ''}
					minWidth={styleOverrides.minWidth ?? ''}
					outline={styleOverrides.outline ?? ''}
					padding={styleOverrides.padding ?? 0}
					position="absolute"
					whiteSpace="normal"
					width={styleOverrides.width ?? 'auto'}
					zIndex={styleOverrides.zIndex ?? 'menu'}
					css={`
						text-align: ${styleOverrides.textAlign ?? 'left'};
						outline: none !important;
						${styleOverrides.overflow ? `overflow: ${styleOverrides.overflow}` : ''};
					`}
					tabIndex="-1"
					{...rest}
				>
					{children}
					{!hideArrow && (
						<Box
							ref={arrowProps.ref}
							style={arrowProps.style}
							css={`
								width: 25px;
								height: 25px;
								position: absolute;
								overflow: hidden;
								pointer-events: none;
								text-align: center;
								--bg: ${({ theme }) => theme.colors.popover.background};
								--shadow: ${({ theme }) => theme.shadows[1]};

								&::after {
									content: '';
									border: ${styleOverrides?.border ?? 'none'};
									position: absolute;
									width: ${arrowWidth};
									height: ${arrowWidth};
									background: ${theme?.backgroundColor ?? 'var(--bg)'};
									transform: translateX(-50%) translateY(-50%) rotate(45deg);
									box-shadow: ${styleOverrides?.hideShadow ? 'none' : 'var(--shadow)'};
								}
								${placement ? arrowStyles[getPlacement(placement)] : arrowStyles.top};
							`}
						/>
					)}
				</Box>
			)}
		</Popper>
	);
}
