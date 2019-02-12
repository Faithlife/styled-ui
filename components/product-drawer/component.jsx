import React from 'react';
import PropTypes from 'prop-types';
import defaultResources from './locales/en-US/resources.json';
import { FaithlifeConnect, FaithlifeEquip } from './animated-image';
import { ProductLinkList, ProductLink } from './product-link';
import {
	FaithlifeFlameSvg,
	FaithlifeTvSvg,
	LogosSvg,
	MobileEdSvg,
	EbooksSvg,
	ProclaimSvg,
	SermonsSvg,
	CloseButtonSvg,
	IndividualsSvg,
	ChurchesSvg,
	SitesSvg,
	FaithlifeStudyBibleSvg,
	GivingSvg,
	BibleScreenSvg,
} from './svgs';
import * as Styled from './styled';

export class ProductDrawer extends React.PureComponent {
	static propTypes = {
		isBrandBarEnabled: PropTypes.bool.isRequired,
		resources: PropTypes.object,
		customClassNames: PropTypes.shape({
			toggleButton: PropTypes.string,
		}),
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
		const { isBrandBarEnabled, customClassNames } = this.props;
		const resources = { ...defaultResources.productDrawer, ...this.props.resources };
		const { isOpen } = this.state;

		return (
			<Styled.ProductDrawer>
				<Styled.ProductDrawerToggle
					className={(customClassNames && customClassNames.toggleButton) || null}
					onClick={this.handleToggleClick}
					ref={el => {
						this.toggle = el;
					}}
					tabIndex="-1"
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
					<Styled.ProductDrawerToggleText
						className={(customClassNames && customClassNames.toggleButtonText) || null}
					>
						{resources.products}
					</Styled.ProductDrawerToggleText>
				</Styled.ProductDrawerToggle>
				{isOpen ? (
					<Styled.ProductDrawerDropdown
						isBrandBarEnabled={isBrandBarEnabled}
						onBlur={this.handleBlur}
						tabIndex="-1"
					>
						<Styled.DropdownCloseButton onClick={this.handleCloseButtonClick}>
							<img src={CloseButtonSvg} alt={resources.closeButtonAltText} />
						</Styled.DropdownCloseButton>
						<Styled.DropdownColumns>
							<Styled.DropdownColumn>
								<Styled.DropdownHeader>
									<img role="presentation" src={IndividualsSvg} />
									<h1>{resources.individualsSectionTitle}</h1>
								</Styled.DropdownHeader>
								<Styled.DropdownBody>
									<ProductLinkList isVisible={isOpen}>
										<ProductLink
											title={resources.faithlifeLinkTitle}
											description={resources.faithlifeIndividualLinkDescription}
											href="https://faithlife.com"
											autoFocus
										>
											<Styled.ProductLinkIcon src={FaithlifeFlameSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.logosLinkTitle}
											description={resources.logosLinkDescription}
											href="https://www.logos.com"
										>
											<Styled.ProductLinkIcon src={LogosSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.mobileEdLinkTitle}
											description={resources.mobileEdLinkDescription}
											href="https://www.logos.com/mobile-ed"
										>
											<Styled.ProductLinkIcon src={MobileEdSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.faithlifeTvLinkTitle}
											description={resources.faithlifeTvLinkDescription}
											href="https://faithlifetv.com/"
										>
											<Styled.ProductLinkIcon src={FaithlifeTvSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.ebooksLinkTitle}
											description={resources.ebooksLinkDescription}
											href="https://ebooks.faithlife.com/"
										>
											<Styled.ProductLinkIcon src={EbooksSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.faithlifeStudyBibleLinkTitle}
											description={resources.faithlifeStudyBibleLinkDescription}
											href="https://faithlife.com/products/faithlife-study-bible"
										>
											<Styled.ProductLinkIcon src={FaithlifeStudyBibleSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.bsmLinkTitle}
											description={resources.bsmLinkDescription}
											href="https://www.biblestudymagazine.com/"
										/>
									</ProductLinkList>
								</Styled.DropdownBody>
								<Styled.DropdownFooter>
									<Styled.FooterDivider />
									<FaithlifeConnect isVisible={isOpen} />
									<p>{resources.connectDescription}</p>
									<Styled.LearnMoreLink
										href="https://connect.faithlife.com/"
										target="_blank"
										rel="noopener noreferrer"
									>
										{resources.learnMore}
									</Styled.LearnMoreLink>
								</Styled.DropdownFooter>
							</Styled.DropdownColumn>
							<Styled.DropdownColumn>
								<Styled.DropdownHeader>
									<img role="presentation" src={ChurchesSvg} />
									<h1>{resources.churchesSectionTitle}</h1>
								</Styled.DropdownHeader>
								<Styled.DropdownBody>
									<ProductLinkList isVisible={isOpen}>
										<ProductLink
											title={resources.faithlifeLinkTitle}
											description={resources.faithlifeChurchLinkDescription}
											href="https://faithlife.com"
										>
											<Styled.ProductLinkIcon src={FaithlifeFlameSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.sitesLinkTitle}
											description={resources.sitesLinkDescription}
											href="https://sites.faithlife.com/"
										>
											<Styled.ProductLinkIcon src={SitesSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.proclaimLinkTitle}
											description={resources.proclaimLinkDescription}
											href="https://proclaimonline.com/"
										>
											<Styled.ProductLinkIcon src={ProclaimSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.sermonsLinkTitle}
											description={resources.sermonsLinkDescription}
											href="https://sermons.faithlife.com/"
										>
											<Styled.ProductLinkIcon src={SermonsSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.givingLinkTitle}
											description={resources.givingLinkDescription}
											href="https://giving.faithlife.com"
										>
											<Styled.ProductLinkIcon src={GivingSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.faithlifeBibleScreenLinkTitle}
											description={resources.faithlifeBibleScreenLinkDescription}
											href="https://faithlife.com/products/biblescreen"
										>
											<Styled.ProductLinkIcon src={BibleScreenSvg} role="presentation" />
										</ProductLink>
										<ProductLink
											title={resources.ministryTeamMagazineLinkTitle}
											description={resources.ministryTeamMagazineLinkDescription}
											href="https://faithlife.com/products/ministry-team-magazine"
										/>
									</ProductLinkList>
								</Styled.DropdownBody>
								<Styled.DropdownFooter>
									<Styled.FooterDivider />
									<FaithlifeEquip isVisible={isOpen} />
									<p>{resources.equipDescription}</p>
									<Styled.LearnMoreLink
										href="https://faithlife.com/products/equip?utm_medium=web&utm_content=product-drawer-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										{resources.learnMore}
									</Styled.LearnMoreLink>
								</Styled.DropdownFooter>
							</Styled.DropdownColumn>
						</Styled.DropdownColumns>
						<Styled.DropdownSeeMore>
							<Styled.DropdownSeeMoreLink
								href="https://faithlife.com/about"
								target="_blank"
								rel="noopener noreferrer"
							>
								{resources.more}
							</Styled.DropdownSeeMoreLink>
						</Styled.DropdownSeeMore>
					</Styled.ProductDrawerDropdown>
				) : null}
			</Styled.ProductDrawer>
		);
	}
}
