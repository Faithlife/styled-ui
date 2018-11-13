import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled.jsx';

const ElementType = typeof HTMLElement !== 'undefined' ? HTMLElement : Object;

export class Popover extends React.Component {
	static propTypes = {
		/** Is the popover open */
		isOpen: PropTypes.bool,
		/** Element the popup is anchored to */
		anchorElement: PropTypes.instanceOf(ElementType),
		/** Where on the target the popover renders */
		placement: PropTypes.string,
		/** If the popup needs to escape the local stacking context */
		breakOut: PropTypes.bool,
		/** Show popover arrow */
		showArrow: PropTypes.bool,
		/** Delay on popover showing in milliseconds*/
		delay: PropTypes.number,
		/** Not all modifiers are shown. Refer to https://popper.js.org/popper-documentation.html#modifiers for a full list*/
		modifiers: PropTypes.shape({
			arrow: PropTypes.object,
			offset: PropTypes.shape({
				enabled: PropTypes.bool,
				offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			}),
			preventOverflow: PropTypes.shape({
				padding: PropTypes.number,
				boundariesElement: PropTypes.oneOfType([PropTypes.string, ElementType]),
			}),
			flip: PropTypes.shape({
				enabled: PropTypes.bool,
				behavior: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
				padding: PropTypes.number,
				boundariesElement: PropTypes.oneOfType([PropTypes.string, ElementType]),
			}),
		}),
		styleOverrides: PropTypes.shape({
			hideShadow: PropTypes.bool,
			width: PropTypes.string,
			padding: PropTypes.string,
		}),
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
			textColor: PropTypes.string,
			boder: PropTypes.string,
		}),
		/** Contents of the Popover */
		children: PropTypes.node,
	};

	static defaultProps = {
		placement: 'bottom',
		theme: { backgroundColor: '#ffffff' },
		styleOverrides: {},
	};

	state = { isOpen: this.props.isOpen && this.props.delay === 0 };

	componentDidMount() {
		this.onOpenStateChange();
	}

	componentDidUpdate() {
		this.onOpenStateChange();
		if (this.arrow.current !== this.prevArrow) {
			this.prevArrow = this.arrow.current;
			this.forceUpdate();
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	onOpenStateChange() {
		if (this.props.isOpen !== this.state.isOpen && this.timeout == null) {
			this.timeout = setTimeout(() => {
				this.setState({ isOpen: this.props.isOpen }, () => {
					this.timeout = null;
				});
			}, this.props.delay);
		}
	}

	timeout = null;
	arrow = React.createRef();

	getOptions = () => ({
		placement: this.props.placement,
		eventsEnabled: true,
		positionFixed: false,
		modifiers: {
			...this.props.modifiers,
			arrow: {
				...(this.props.modifiers && this.props.modifiers.arrow),
				enabled: this.arrow.current != null,
				element: this.arrow.current,
			},
		},
	});

	render() {
		return (
			<ThemeProvider theme={this.props.theme}>
				<Popper
					anchorEl={this.props.anchorElement}
					disablePortal={!this.props.breakOut}
					open={this.state.isOpen}
					popperOptions={this.getOptions()}
				>
					<Styled.PopoverContent
						styleOverrides={this.props.styleOverrides}
						showArrow={this.props.showArrow}
					>
						{this.props.children}
						{this.props.showArrow && (
							<Styled.Arrow innerRef={this.arrow} styleOverrides={this.props.styleOverrides} />
						)}
					</Styled.PopoverContent>
				</Popper>
			</ThemeProvider>
		);
	}
}
