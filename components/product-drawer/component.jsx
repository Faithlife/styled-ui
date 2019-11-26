import React from 'react';
import PropTypes from 'prop-types';
import { PopoverManager, PopoverReference } from '../popover';
import * as Styled from './styled';

import ProductDrawerDropdown from './product-drawer-dropdown';

export class ProductDrawer extends React.PureComponent {
	static propTypes = {
		resources: PropTypes.shape({
			closeButtonAltText: PropTypes.string.isRequired,
			toggleButtonAltText: PropTypes.string.isRequired,
			individualsSectionTitle: PropTypes.string.isRequired,
			churchesSectionTitle: PropTypes.string.isRequired,
			faithlifeLinkTitle: PropTypes.string.isRequired,
			faithlifeIndividualLinkDescription: PropTypes.string.isRequired,
			faithlifeChurchLinkDescription: PropTypes.string.isRequired,
			sitesLinkTitle: PropTypes.string.isRequired,
			sitesLinkDescription: PropTypes.string.isRequired,
			proclaimLinkTitle: PropTypes.string.isRequired,
			proclaimLinkDescription: PropTypes.string.isRequired,
			logosLinkTitle: PropTypes.string.isRequired,
			logosLinkDescription: PropTypes.string.isRequired,
			mobileEdLinkTitle: PropTypes.string.isRequired,
			mobileEdLinkDescription: PropTypes.string.isRequired,
			faithlifeTvLinkTitle: PropTypes.string.isRequired,
			faithlifeTvLinkDescription: PropTypes.string.isRequired,
			ebooksLinkTitle: PropTypes.string.isRequired,
			ebooksLinkDescription: PropTypes.string.isRequired,
			bsmLinkTitle: PropTypes.string.isRequired,
			bsmLinkDescription: PropTypes.string.isRequired,
			connectDescription: PropTypes.string.isRequired,
			learnMore: PropTypes.string.isRequired,
			sermonsLinkTitle: PropTypes.string.isRequired,
			sermonsLinkDescription: PropTypes.string.isRequired,
			equipDescription: PropTypes.string.isRequired,
			comingSoon: PropTypes.string.isRequired,
			more: PropTypes.string.isRequired,
			drawerToggleText: PropTypes.string.isRequired,
			faithlifeStudyBibleLinkTitle: PropTypes.string.isRequired,
			faithlifeStudyBibleLinkDescription: PropTypes.string.isRequired,
			givingLinkTitle: PropTypes.string.isRequired,
			givingLinkDescription: PropTypes.string.isRequired,
			faithlifeBibleScreenLinkTitle: PropTypes.string.isRequired,
			faithlifeBibleScreenLinkDescription: PropTypes.string.isRequired,
			ministryTeamMagazineLinkTitle: PropTypes.string.isRequired,
			ministryTeamMagazineLinkDescription: PropTypes.string.isRequired,
		}),
		styleOverrides: PropTypes.shape({
			mobileTopOffset: PropTypes.string,
			tabletRightOffset: PropTypes.string,
			toggleButtonColor: PropTypes.string,
			toggleButtonHoverColor: PropTypes.string,
			toggleTextColor: PropTypes.string,
			toggleTextFontFamily: PropTypes.string,
			toggleTextFontSize: PropTypes.string,
		}),
		title: PropTypes.string,
	};

	static defaultProps = {
		styleOverrides: {},
	};

	state = {
		isOpen: false,
	};

	handleBlur = e => {
		const currentTarget = e.currentTarget;

		setTimeout(() => {
			if (
				!currentTarget.contains(document.activeElement) &&
				this.toggle !== document.activeElement
			) {
				this.setState({ isOpen: false });
			}
		}, 0);
	};

	handleToggleClick = () => {
		this.setState(({ isOpen }) => ({
			isOpen: !isOpen,
		}));
	};

	handleCloseButtonClick = () => {
		this.setState({ isOpen: false });
	};

	render() {
		const { styleOverrides, resources } = this.props;
		const { isOpen } = this.state;

		return (
			<Styled.ProductDrawer>
				<PopoverManager onFocusAway={() => this.setState({ isOpen: false })}>
					<PopoverReference>
						<Styled.ProductDrawerToggle
							styleOverrides={styleOverrides}
							onClick={this.handleToggleClick}
							ref={el => {
								this.toggle = el;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								title={resources.toggleButtonAltText}
							>
								<path
									d="M0 0h4v4H0zm0 6h4v4H0zm0 6h4v4H0zM6 0h4v4H6zm0 6h4v4H6zm0 6h4v4H6zm6-12h4v4h-4zm0 6h4v4h-4zm0 6h4v4h-4z"
									fill="#878787"
									fillRule="evenodd"
								/>
							</svg>
							<Styled.ProductDrawerToggleText styleOverrides={styleOverrides}>
								{resources.drawerToggleText}
							</Styled.ProductDrawerToggleText>
						</Styled.ProductDrawerToggle>
					</PopoverReference>
					{isOpen ? (
						<ProductDrawerDropdown
							isOpen={isOpen}
							resources={resources}
							styleOverrides={styleOverrides}
							handleCloseButtonClick={this.handleCloseButtonClick}
							handleBlur={this.handleBlur}
						/>
					) : null}
				</PopoverManager>
			</Styled.ProductDrawer>
		);
	}
}
