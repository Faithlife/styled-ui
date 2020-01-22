import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { Box } from '../Box';
import {
	PlacementOptionsProps,
	FocusHandlerInboundsElement,
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
		/** Not all modifiers are shown. Refer to https://popper.js.org/popper-documentation.html#modifiers for a full list*/
		modifiers: PropTypes.shape({
			offset: PropTypes.shape({
				enabled: PropTypes.bool,
				offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			}),
			preventOverflow: PropTypes.shape({
				padding: PropTypes.number,
				boundariesElement: PropTypes.any,
			}),
			flip: PropTypes.shape({
				enabled: PropTypes.bool,
				behavior: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
				padding: PropTypes.number,
				boundariesElement: PropTypes.any,
			}),
		}),
		/** Contents of the Popover */
		children: PropTypes.node,
		/** Where to inject the popover. Defaults to inline */
		container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
		/** Hide popover arrow */
		hideArrow: PropTypes.bool,
		/** Delay on popover showing in milliseconds*/
		delay: PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
		eventsEnabled: PropTypes.bool,
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
		modifiers: {},
		styleOverrides: {},
	};

	state = {
		showPopper: this.props.isOpen || false,
	};

	_timeout = null;

	componentDidMount() {
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
		const {
			children,
			placement: popoverPlacement,
			hideArrow,
			delay,
			theme,
			modifiers,
			styleOverrides,
			eventsEnabled,
			positionFixed,
			...props
		} = this.props;
		const { showPopper } = this.state;

		const popperModifiers = {
			...modifiers,
			computeStyle: {
				...modifiers.computeStyle,
				gpuAcceleration: false,
			},
		};

		const popover = (
			<Popper
				placement={popoverPlacement}
				modifiers={popperModifiers}
				eventsEnabled={eventsEnabled}
				positionFixed={positionFixed}
			>
				{({ ref, style, placement, arrowProps }) => (
					<Box
						ref={ref}
						placement={placement}
						style={{
							...style,
							...(!hideArrow ? margins[getPlacement(placement)] : {}),
						}}
						delay={delay}
						onAnimationEnd={this.handleTransition}
						hideArrow={hideArrow}
						background={
							styleOverrides.background
								? styleOverrides.background
								: theme && theme.backgroundColor
								? theme.backgroundColor
								: 'white'
						}
						backgroundColor={theme && theme.backgroundColor ? theme.backgroundColor : 'white'}
						border={styleOverrides.border ? styleOverrides.border : 'none'}
						borderRadius={styleOverrides.borderRadius ? styleOverrides.borderRadius : 0}
						boxShadow={styleOverrides.hideShadow ? 0 : 1}
						color={theme && theme.textColor ? theme.textColor : ''}
						fontSize={styleOverrides.fontSize ? styleOverrides.fontSize : 'medium'}
						fontWeight={styleOverrides.fontWeight ? styleOverrides.fontWeight : 'normal'}
						height={styleOverrides.height ? styleOverrides.height : 'auto'}
						lineHeight={styleOverrides.lineHeight ? styleOverrides.lineHeight : 'normal'}
						margin={styleOverrides.margin ? styleOverrides.margin : 0}
						maxHeight={styleOverrides.maxHeight ? styleOverrides.maxHeight : maxHeight}
						maxWidth={styleOverrides.maxWidth ? styleOverrides.maxWidth : maxWidth}
						minHeight={styleOverrides.minHeight ? styleOverrides.minHeight : ''}
						minWidth={styleOverrides.minWidth ? styleOverrides.minWidth : ''}
						outline={styleOverrides.outline ? styleOverrides.outline : ''}
						padding={styleOverrides.padding ? styleOverrides.padding : 0}
						position="absolute"
						whiteSpace="normal"
						width={styleOverrides.width ? styleOverrides.width : 'auto'}
						zIndex={styleOverrides.zIndex ? styleOverrides.zIndex : 'menu'}
						css={`
							text-align: ${styleOverrides.textAlign ? styleOverrides.textAlign : 'left'};
							${styleOverrides.overflow ? `overflow: ${styleOverrides.overflow}` : ''};
						`}
						{...props}
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

									&::after {
										content: '';
										border: ${styleOverrides.border ? styleOverrides.border : 'none'};
										position: absolute;
										width: ${arrowWidth};
										height: ${arrowWidth};
										background: ${theme && theme.backgroundColor ? theme.backgroundColor : 'white'};
										transform: translateX(-50%) translateY(-50%) rotate(45deg);
										box-shadow: ${styleOverrides.hideShadow
											? 'none'
											: '0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.12)'};
									}
									${placement ? arrowStyles[getPlacement(placement)] : arrowStyles.top};
								`}
							/>
						)}
					</Box>
				)}
			</Popper>
		);

		if (!!this.targetContainer && showPopper) {
			return ReactDOM.createPortal(
				<FocusHandlerInboundsElement>{popover}</FocusHandlerInboundsElement>,
				this.targetContainer,
			);
		}

		if (showPopper) {
			return popover;
		}

		return null;
	}
}
