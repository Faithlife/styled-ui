import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import styled from 'styled-components';
import { textStyle } from 'styled-system';
import { typography } from '../../theme/system';
import { Box } from '../Box';
import { colors } from '../shared-styles';
import { PlacementOptionsProps, FocusHandlerInboundsElement } from './popper-helpers';
import * as Styled from './styled';

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
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
			textColor: PropTypes.string,
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
			modifiers,
			styleOverrides,
			eventsEnabled,
			positionFixed,
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
					<PopoverBox
						ref={ref}
						style={{
							...style,
							...(!hideArrow ? Styled.margins[Styled.getPlacement(placement)] : {}),
						}}
						onAnimationEnd={this.handleTransition}
						background="white"
						boxShadow={1}
						textStyle="c.16"
						position="absolute"
						zIndex="menu"
						textAlign="center"
					>
						{children}
						{!hideArrow && (
							<Styled.Arrow
								ref={arrowProps.ref}
								placement={placement}
								style={arrowProps.style}
								styleOverrides={styleOverrides}
								position="absolute"
								width="25px"
								height="25px"
								overflow="hidden"
								arrowBackground="white"
							/>
						)}
					</PopoverBox>
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

const PopoverBox = styled(Box)`
	${textStyle}
	${typography}
`;
