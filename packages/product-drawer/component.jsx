import React from 'react';
import PropTypes from 'prop-types';
import { PopoverManager, PopoverReference } from '@faithlife/styled-ui';
import { Localize, LocalizationProvider } from '@faithlife/react-ui';
import * as Styled from './styled';
import defaultResources from './locales/en-US/resources.json';
import ProductDrawerDropdown from './product-drawer-dropdown';

const defaultToggleButtonSize = 16;

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
			faithlifeFaithlifeTvChurchLinkTitle: PropTypes.string,
			faithlifeFaithlifeTvChurchLinkDescription: PropTypes.string,
			ministryTeamMagazineLinkTitle: PropTypes.string,
			ministryTeamMagazineLinkDescription: PropTypes.string,
		}),
		styleOverrides: PropTypes.shape({
			mobileTopOffset: PropTypes.string,
			tabletRightOffset: PropTypes.string,
			toggleButtonColor: PropTypes.string,
			toggleButtonHoverColor: PropTypes.string,
			toggleButtonSize: PropTypes.number,
			fullscreenTopOffset: PropTypes.string,
			toggleTextLeftMargin: PropTypes.string,
		}),
	};

	static defaultProps = {
		styleOverrides: {
			toggleButtonSize: defaultToggleButtonSize,
		},
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
											<AppDrawerIcon
												width={styleOverrides.toggleButtonSize || defaultToggleButtonSize}
												height={styleOverrides.toggleButtonSize || defaultToggleButtonSize}
											/>
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

function AppDrawerIcon(props) {
	return (
		<svg viewBox={`0 0 24 24`} {...props}>
			<path
				fill="#888"
				d="M8,16 L8,21 L3,21 L3,16 L8,16 Z M15,16 L15,21 L10,21 L10,16 L15,16 Z M22,16 L22,21 L17,21 L17,16 L22,16 Z M8,9 L8,14 L3,14 L3,9 L8,9 Z M15,9 L15,14 L10,14 L10,9 L15,9 Z M22,9 L22,14 L17,14 L17,9 L22,9 Z M8,2 L8,7 L3,7 L3,2 L8,2 Z M15,2 L15,7 L10,7 L10,2 L15,2 Z M22,2 L22,7 L17,7 L17,2 L22,2 Z"
			/>
		</svg>
	);
}
