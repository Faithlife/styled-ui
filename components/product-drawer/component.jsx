import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { LoadingSpinner } from '../loading-spinner';
import { PopoverManager, PopoverReference } from '../popover';

const ProductDrawerDropdown = lazy(() => import('./product-drawer-dropdown'));

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
			products: PropTypes.string.isRequired,
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
		const { styleOverrides, resources } = this.props;
		const { isOpen } = this.state;

		return (
			<Box position="relative">
				<PopoverManager onFocusAway={() => this.setState({ isOpen: false })}>
					<PopoverReference>
						<ProductDrawerToggle
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
							<Text display={['none', null, 'inline']} marginLeft={3} textStyle="c.14">
								{resources.products}
							</Text>
						</ProductDrawerToggle>
					</PopoverReference>
					{isOpen ? (
						<Suspense fallback={<LoadingSpinner />}>
							<ProductDrawerDropdown
								isOpen={isOpen}
								resources={resources}
								styleOverrides={styleOverrides}
								handleCloseButtonClick={this.handleCloseButtonClick}
							/>
						</Suspense>
					) : null}
				</PopoverManager>
			</Box>
		);
	}
}

const ProductDrawerToggle = styled.button`
	display: flex;
	padding: 0;
	align-items: center;
	cursor: pointer;
	background: transparent;
	border: none;

	color: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};

	path {
		fill: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};
	}

	&:hover {
		color: ${({ styleOverrides }) => styleOverrides.toggleButtonHoverColor || 'initial'};

		path {
			fill: ${({ styleOverrides }) => styleOverrides.toggleButtonHoverColor || 'initial'};
		}
	}

	&:focus {
		outline: none;
	}
`;
