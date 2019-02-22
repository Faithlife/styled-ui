import React, { RefObject, Component, MouseEvent, TouchEvent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Placement, Modifiers } from 'popper.js';
import { Popper } from 'react-popper';
import { ClickAwayHandler } from '../utils';
import { colors } from '../shared-styles';
import * as Styled from './styled';

type PopoverPlacements = Exclude<Placement, 'auto' | 'auto-start' | 'auto-end'>;

export type Props = {
	/** Is the popover open */
	isOpen?: boolean;
	/** Where on the target the popover renders */
	placement?: PopoverPlacements;
	/** Refer to https://popper.js.org/popper-documentation.html#modifiers for documentation*/
	modifiers?: Modifiers;
	/** Where to inject the popover. Defaults to inline */
	container?: string | RefObject<any> | (() => RefObject<any>);
	/** Hide popover arrow */
	hideArrow?: boolean;
	/** Delay on popover showing in milliseconds*/
	delay?: { show: number; hide: number };
	/** Will be called when the popover is clicked away from */
	onClickAway?: (event: MouseEvent | TouchEvent) => void;
	styleOverrides?: {
		hideShadow?: boolean;
		width?: string;
		padding?: string;
		border?: string;
		zIndex?: number;
	};
	theme?: {
		backgroundColor?: string;
		textColor?: string;
	};
};

const initialState = {
	showPopper: false,
};

type State = Readonly<typeof initialState>;

/** Positioning helper used to display content above another element.
 *  Refs are not supported, please use PopoverManager and PopoverReference to handle positioning.
 */
export class Popover extends Component<Props, State> {
	static defaultProps: Props = {
		placement: 'top',
		theme: {
			backgroundColor: colors.white,
		},
		styleOverrides: {},
	};

	readonly state: State = initialState;

	private timeout: number | null = null;
	private targetContainer: Element | null = null;

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
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	handleIsPopoverShowing = (prevIsOpen, isOpen, delay) => {
		if (prevIsOpen !== isOpen && !delay) {
			this.setState({ showPopper: isOpen });
		} else if (prevIsOpen && !isOpen && !!delay) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => {
				this.setState({ showPopper: false });
				this.timeout = null;
			}, delay.hide || 0);
		} else if (!prevIsOpen && isOpen && !!delay) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => {
				this.setState({ showPopper: true });
				this.timeout = null;
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
			onClickAway,
		} = this.props;
		const { showPopper } = this.state;

		const popover = (
			<Popper placement={popoverPlacement} modifiers={modifiers}>
				{({ ref, style, placement, arrowProps }) => (
					<ThemeProvider theme={theme}>
						<ClickAwayHandler onClick={onClickAway}>
							<Styled.PopoverContent
								ref={ref}
								placement={placement}
								style={{
									...style,
									...(!hideArrow ? Styled.margins[Styled.getPlacement(placement)] : {}),
								}}
								delay={delay}
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
						</ClickAwayHandler>
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
