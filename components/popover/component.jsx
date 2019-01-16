import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Popper } from 'react-popper';
import { colors } from '../shared-styles';
import * as Styled from './styled';

/** Positioning helper used to display content above another element.
 *  Refs are not supported, please use PopoverManager and PopoverReference to handle positioning.
 */
export class Popover extends React.Component {
	static propTypes = {
		/** Is the popover open */
		isOpen: PropTypes.bool,
		/** Where on the target the popover renders */
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
		styleOverrides: PropTypes.shape({
			hideShadow: PropTypes.bool,
			width: PropTypes.string,
			padding: PropTypes.string,
			border: PropTypes.string,
		}),
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
			textColor: PropTypes.string,
		}),
	};

	static defaultProps = {
		placement: 'top',
		theme: {
			backgroundColor: colors.white,
		},
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
			modifiers,
			hideArrow,
			delay,
			theme,
			styleOverrides,
		} = this.props;
		const { showPopper } = this.state;

		const popover = (
			<Popper placement={popoverPlacement} modifiers={modifiers}>
				{({ ref, style, placement, arrowProps }) => (
					<ThemeProvider theme={theme}>
						<Styled.PopoverContent
							ref={ref}
							placement={placement}
							style={{
								...style,
								...(!hideArrow ? Styled.margins[Styled.getPlacement(placement)] : {}),
							}}
							delay={delay}
							onAnimationEnd={this.handleTransition}
							hideArrow={hideArrow}
							styleOverrides={styleOverrides}
						>
							{children}
							{!hideArrow && (
								<Styled.Arrow
									ref={arrowProps.ref}
									placement={placement}
									style={arrowProps.style}
									styleOverrides={styleOverrides}
								/>
							)}
						</Styled.PopoverContent>
					</ThemeProvider>
				)}
			</Popper>
		);

		if (!!this.targetContainer && showPopper) {
			return ReactDOM.createPortal(<div>{popover}</div>, this.targetContainer);
		}

		if (showPopper) {
			return popover;
		}

		return null;
	}
}
