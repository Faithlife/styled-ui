import styled from 'styled-components';
import { variant, layout, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { tabs, tabLists, selected } from '../../theme/tabs';
import { Box } from '../Box';
import { UtilityButton } from '../button';

const tabVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabs,
});

const selectedTabVariant = variant({
	prop: 'selectedVariant',
	scale: 'tab',
	variants: selected,
});

const tabListVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabLists,
});

const TabCore = styled(UtilityButton).attrs(({ variant, selected, panelId }) => ({
	selectedVariant: `${variant}-${selected}`,

	role: 'tab',
	'aria-controls': panelId,
	'aria-selected': selected,
	tabIndex: selected ? 1 : -1,
}))`
	position: relative;

	display: block;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;

	${tabVariant}
	${selectedTabVariant}
	${textStyle};

	${common};
	${typography};
	${layout};
	${position};
	${border};
	${background};
`;

const TabListCore = styled(Box).attrs(({ label, labeledBy }) => ({
	role: 'tablist',
	...(labeledBy ? { 'aria-labelledby': labeledBy } : { 'aria-label': label }),
}))`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	${tabListVariant}
	${textStyle};

	${common};
	${layout};
	${position};
	${border};
	${background};
`;

const TabPanelsCore = styled(Box)``;

const TabPanelCore = styled(Box).attrs(({ tabId }) => ({
	role: 'tabpanel',
	'aria-labelledby': tabId,
}))`
	display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

export { TabCore, TabListCore, TabPanelsCore, TabPanelCore };
