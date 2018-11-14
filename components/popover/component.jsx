import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Popper } from 'react-popper';
import { colors } from '../shared-styles';
import * as Styled from './styled.jsx';

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
		/** allows using an arbitrary reference element */
		referenceElement: PropTypes.shape({
			getBoundingClientRect: PropTypes.func.isRequired,
			clientWidth: PropTypes.number.isRequired,
			clientHeight: PropTypes.number.isRequired,
		}),
		/** Not all modifiers are shown. Refer to https://popper.js.org/popper-documentation.html#modifiers for a full list*/
		modifiers: PropTypes.shape({
			offset: PropTypes.shape({
				enabled: PropTypes.bool,
				offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			}),
			preventOverflow: PropTypes.shape({
				padding: PropTypes.number,
				boundariesElement: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.instanceOf(HTMLElement),
				]),
			}),
			flip: PropTypes.shape({
				enabled: PropTypes.bool,
				behavior: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
				padding: PropTypes.number,
				boundariesElement: PropTypes.oneOfType([PropTypes.string, HTMLElement]),
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
		}),
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
			textColor: PropTypes.string,
			border: PropTypes.string,
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
		showPopper: false,
	};

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

	handleIsPopoverShowing = (prevIsOpen, isOpen, delay) => {
		if (prevIsOpen !== isOpen && !delay) {
			this.setState({ showPopper: isOpen });
		} else if (prevIsOpen && !isOpen && !!delay) {
			setTimeout(() => this.setState({ showPopper: false }), delay.hide || 0);
		} else if (!prevIsOpen && isOpen && !!delay) {
			setTimeout(() => this.setState({ showPopper: true }), delay.show || 0);
		}
	};

	render() {
		const {
			children,
			placement: popoverPlacement,
			referenceElement,
			modifiers,
			hideArrow,
			theme,
			styleOverrides,
		} = this.props;
		const { showPopper } = this.state;

		const popperProps = {
			placement: popoverPlacement,
			modifiers,
		};

		if (referenceElement) {
			popperProps.referenceElement = referenceElement;
		}

		const popover = (
			<Popper {...popperProps}>
				{({ ref, style, placement, arrowProps }) => (
					<ThemeProvider theme={theme}>
						<Styled.PopoverContent
							innerRef={ref}
							placement={placement}
							style={{
								...style,
								...(!hideArrow ? Styled.margins[Styled.getPlacement(placement)] : {}),
							}}
							styleOverrides={styleOverrides}
						>
							{children}
							{!hideArrow && (
								<Styled.Arrow
									innerRef={arrowProps.ref}
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
