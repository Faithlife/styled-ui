import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../Box';
import { Paragraph } from '../../Paragraph';
import { Close } from '../../icons';
import { Button } from '../../button';
import { FaithlifeConnectAnimatedImage, FaithlifeEquipAnimatedImage } from './animated-image';
import { ProductLinkList, ProductLink } from './product-link';
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

export const ProductDrawerDropdown = ({ resources, isOpen, handleCloseButtonClick }) => (
	<Styled.ProductDrawerDropdown
		onBlur={this.handleBlur}
		position={['fixed', null, 'absolute']}
		top={['0', null, 'auto']}
		right={['0', null, 'auto']}
		bottom={['0', null, 'auto']}
		left={['0', null, 'auto']}
		borderRadius="4px"
		backgroundColor="white"
		boxShadow="0 1px 6px 0 rgba(0, 0, 0, 0.23)"
		zIndex="toast"
		css={{ overflowY: ['scroll', null, 'auto'] }}
	>
		<Box position="absolute" top="0" right="0" border="none" backgroundColor="transparent">
			<Button primaryTransparent large icon={<Close />} onClick={handleCloseButtonClick} />
		</Box>
		<Box display="flex" flexDirection={['column', null, 'row']}>
			<Styled.DropdownColumn>
				<Styled.DropdownHeader>
					<img alt="" src={IndividualsSvg} />
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
					<img alt="" src={ChurchesSvg} />
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
		</Box>
		<Paragraph textAlign="center" borderRadius="0 0 4px 4px">
			<Styled.DropdownSeeMoreLink
				href="https://faithlife.com/about"
				target="_blank"
				rel="noopener noreferrer"
			>
				{resources.more}
			</Styled.DropdownSeeMoreLink>
		</Paragraph>
	</Styled.ProductDrawerDropdown>
);

ProductDrawerDropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleCloseButtonClick: PropTypes.func.isRequired,
	resources: PropTypes.object.isRequired,
	styleOverrides: PropTypes.shape({
		mobileTopOffset: PropTypes.string,
	}),
};
