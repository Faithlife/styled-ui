import React from 'react';
import PropTypes from 'prop-types';
import { FaithlifeConnectAnimatedImage, FaithlifeEquipAnimatedImage } from './animated-image';
import { ProductLinkList, ProductLink } from './product-link';
import { LegacyButton as Button } from '../../button';
import { X as Close } from '../../icons/18px';
import {
	FaithlifeFlameSvg,
	FaithlifeTvSvg,
	LogosSvg,
	MobileEdSvg,
	EbooksSvg,
	ProclaimSvg,
	SermonsSvg,
	IndividualsSvg,
	ChurchesSvg,
	SitesSvg,
	FaithlifeStudyBibleSvg,
	GivingSvg,
	BibleScreenSvg,
} from './svgs';
import * as Styled from './styled';

export const ProductDrawerDropdown = ({
	styleOverrides,
	resources,
	isOpen,
	handleCloseButtonClick,
	handleBlur,
}) => (
	<Styled.ProductDrawerDropdown styleOverrides={styleOverrides} onBlur={handleBlur}>
		<Styled.DropdownClose>
			<Button
				variant="primaryTransparent"
				size="large"
				icon={<Close />}
				onClick={handleCloseButtonClick}
			/>
		</Styled.DropdownClose>
		<Styled.DropdownColumns>
			<Styled.DropdownColumn>
				<Styled.DropdownHeader>
					<IndividualsSvg />
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
							<FaithlifeFlameSvg />
						</ProductLink>
						<ProductLink
							title={resources.logosLinkTitle}
							description={resources.logosLinkDescription}
							href="https://www.logos.com"
						>
							<LogosSvg />
						</ProductLink>
						<ProductLink
							title={resources.mobileEdLinkTitle}
							description={resources.mobileEdLinkDescription}
							href="https://www.logos.com/mobile-ed"
						>
							<MobileEdSvg />
						</ProductLink>
						<ProductLink
							title={resources.faithlifeTvLinkTitle}
							description={resources.faithlifeTvLinkDescription}
							href="https://faithlifetv.com/"
						>
							<FaithlifeTvSvg />
						</ProductLink>
						<ProductLink
							title={resources.ebooksLinkTitle}
							description={resources.ebooksLinkDescription}
							href="https://ebooks.faithlife.com/"
						>
							<EbooksSvg />
						</ProductLink>
						<ProductLink
							title={resources.faithlifeStudyBibleLinkTitle}
							description={resources.faithlifeStudyBibleLinkDescription}
							href="https://faithlife.com/products/faithlife-study-bible"
						>
							<FaithlifeStudyBibleSvg />
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
					<FaithlifeConnectAnimatedImage isVisible={isOpen} />
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
					<ChurchesSvg />
					<h1>{resources.churchesSectionTitle}</h1>
				</Styled.DropdownHeader>
				<Styled.DropdownBody>
					<ProductLinkList isVisible={isOpen}>
						<ProductLink
							title={resources.faithlifeLinkTitle}
							description={resources.faithlifeChurchLinkDescription}
							href="https://faithlife.com"
						>
							<FaithlifeFlameSvg />
						</ProductLink>
						<ProductLink
							title={resources.sitesLinkTitle}
							description={resources.sitesLinkDescription}
							href="https://sites.faithlife.com/"
						>
							<SitesSvg />
						</ProductLink>
						<ProductLink
							title={resources.proclaimLinkTitle}
							description={resources.proclaimLinkDescription}
							href="https://proclaimonline.com/"
						>
							<ProclaimSvg />
						</ProductLink>
						<ProductLink
							title={resources.sermonsLinkTitle}
							description={resources.sermonsLinkDescription}
							href="https://sermons.faithlife.com/"
						>
							<SermonsSvg />
						</ProductLink>
						<ProductLink
							title={resources.givingLinkTitle}
							description={resources.givingLinkDescription}
							href="https://giving.faithlife.com"
						>
							<GivingSvg />
						</ProductLink>
						<ProductLink
							title={resources.faithlifeBibleScreenLinkTitle}
							description={resources.faithlifeBibleScreenLinkDescription}
							href="https://faithlife.com/products/biblescreen"
						>
							<BibleScreenSvg />
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
					<FaithlifeEquipAnimatedImage isVisible={isOpen} />
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
);

ProductDrawerDropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleCloseButtonClick: PropTypes.func.isRequired,
	resources: PropTypes.object.isRequired,
	styleOverrides: PropTypes.shape({
		mobileTopOffset: PropTypes.string,
		tabletRightOffset: PropTypes.string,
	}),
};
