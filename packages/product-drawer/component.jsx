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
			toggleButtonSize: PropTypes.number,
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
				d="M8,16 L8,20 L4,20 L4,16 L8,16 Z M14,16 L14,20 L10,20 L10,16 L14,16 Z M20,16 L20,20 L16,20 L16,16 L20,16 Z M8,10 L8,14 L4,14 L4,10 L8,10 Z M14,10 L14,14 L10,14 L10,10 L14,10 Z M20,10 L20,14 L16,14 L16,10 L20,10 Z M8,4 L8,8 L4,8 L4,4 L8,4 Z M14,4 L14,8 L10,8 L10,4 L14,4 Z M20,4 L20,8 L16,8 L16,4 L20,4 Z"
			/>
		</svg>
	);
}
