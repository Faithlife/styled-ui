import React from 'react';
import PropTypes from 'prop-types';
import { PopoverManager, PopoverReference } from '@faithlife/styled-ui';
import { Localize, LocalizationProvider } from '@faithlife/react-ui';
import * as Styled from './styled';
import defaultResources from './locales/en-US/resources.json';
import ProductDrawerDropdown from './product-drawer-dropdown';

export class ProductDrawer extends React.PureComponent {
	static propTypes = {
		resources: PropTypes.shape({
			closeButtonAltText: PropTypes.string,
			toggleButtonAltText: PropTypes.string,
			individualsSectionTitle: PropTypes.string,
			churchesSectionTitle: PropTypes.string,
			faithlifeLinkTitle: PropTypes.string,
			faithlifeIndividualLinkDescription: PropTypes.string,
			faithlifeChurchLinkDescription: PropTypes.string,
			sitesLinkTitle: PropTypes.string,
			sitesLinkDescription: PropTypes.string,
			proclaimLinkTitle: PropTypes.string,
			proclaimLinkDescription: PropTypes.string,
			logosLinkTitle: PropTypes.string,
			logosLinkDescription: PropTypes.string,
			mobileEdLinkTitle: PropTypes.string,
			mobileEdLinkDescription: PropTypes.string,
			faithlifeTvLinkTitle: PropTypes.string,
			faithlifeTvLinkDescription: PropTypes.string,
			ebooksLinkTitle: PropTypes.string,
			ebooksLinkDescription: PropTypes.string,
			bsmLinkTitle: PropTypes.string,
			bsmLinkDescription: PropTypes.string,
			connectDescription: PropTypes.string,
			learnMore: PropTypes.string,
			sermonsLinkTitle: PropTypes.string,
			sermonsLinkDescription: PropTypes.string,
			equipDescription: PropTypes.string,
			comingSoon: PropTypes.string,
			more: PropTypes.string,
			products: PropTypes.string,
			faithlifeStudyBibleLinkTitle: PropTypes.string,
			faithlifeStudyBibleLinkDescription: PropTypes.string,
			givingLinkTitle: PropTypes.string,
			givingLinkDescription: PropTypes.string,
			faithlifeBibleScreenLinkTitle: PropTypes.string,
			faithlifeBibleScreenLinkDescription: PropTypes.string,
			ministryTeamMagazineLinkTitle: PropTypes.string,
			ministryTeamMagazineLinkDescription: PropTypes.string,
		}),
		styleOverrides: PropTypes.shape({
			mobileTopOffset: PropTypes.string,
			tabletRightOffset: PropTypes.string,
			toggleButtonColor: PropTypes.string,
			toggleButtonHoverColor: PropTypes.string,
		}),
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
		const { styleOverrides, resources: customResources = {} } = this.props;
		const { isOpen } = this.state;

		const resources = {
			...defaultResources,
			...customResources,
		};

		return (
			<LocalizationProvider localizedResources={resources}>
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
								<Localize
									render={resources => (
										<>
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
										</>
									)}
								/>
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
			</LocalizationProvider>
		);
	}
}
