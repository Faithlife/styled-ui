# Product Drawer

Provides a styled dropdown with links to faithlife equip and faithlife connect products.

## Basic Usage

```jsx
import { ProductDrawer } from '@faithlife/product-drawer';

const MyComponent = () => (
    <ProductDrawer />
);
```

## Props

- `styleOverrides: object` - Overrides specific styles in the component
	- `mobileTopOffset: string` - The top margin of the component on mobile
	- `tabletRightOffset: string` - The right margin of the component on tablet
	- `toggleButtonColor: string` - The color of the drop down toggle button
	- `toggleButtonHoverColor: string` - The color of the drop down toggle button when hovered
	- `toggleButtonSize: string` - The height and width of the drop down toggle button icon
	- `fullscreenTopOffset: string` - The top margin/offset of the dropdown on a large viewport
	- `toggleTextLeftMargin: string` - The margin between the menu icon and the text

- `resources: object` - Overrides default localization (if a property is not supplied, the default will be used)
	- `closeButtonAltText: string`
	- `toggleButtonAltText: string`
	- `individualsSectionTitle: string`
	- `churchesSectionTitle: string`
	- `faithlifeLinkTitle: string`
	- `faithlifeIndividualLinkDescription: string`
	- `faithlifeChurchLinkDescription: string`
	- `sitesLinkTitle: string`
	- `sitesLinkDescription: string`
	- `proclaimLinkTitle: string`
	- `proclaimLinkDescription: string`
	- `logosLinkTitle: string`
	- `logosLinkDescription: string`
	- `mobileEdLinkTitle: string`
	- `mobileEdLinkDescription: string`
	- `faithlifeTvLinkTitle: string`
	- `faithlifeTvLinkDescription: string`
	- `ebooksLinkTitle: string`
	- `ebooksLinkDescription: string`
	- `bsmLinkTitle: string`
	- `bsmLinkDescription: string`
	- `connectDescription: string`
	- `learnMore: string`
	- `sermonsLinkTitle: string`
	- `sermonsLinkDescription: string`
	- `equipDescription: string`
	- `comingSoon: string`
	- `more: string`
	- `products: string`
	- `faithlifeStudyBibleLinkTitle: string`
	- `faithlifeStudyBibleLinkDescription: string`
	- `givingLinkTitle: string`
	- `givingLinkDescription: string`
	- `faithlifeBibleScreenLinkTitle: string`
	- `faithlifeBibleScreenLinkDescription: string`
	- `ministryTeamMagazineLinkTitle: string`
	- `ministryTeamMagazineLinkDescription: string`
