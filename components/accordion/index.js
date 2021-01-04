import { Accordion as LegacyAccordion } from './legacy-accordion';
import { AccordionHeader } from './accordion-header';
import { AccordionItem as LegacyAccordionItem } from './legacy-accordion-item';
import { AccordionPanel as LegacyAccordionPanel } from './legacy-accordion-panel';
import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';
import { AccordionPanel } from './accordion-panel';

LegacyAccordion.Header = AccordionHeader;
LegacyAccordion.Item = LegacyAccordionItem;
LegacyAccordion.Panel = LegacyAccordionPanel;

Accordion.Header = AccordionHeader;
Accordion.Item = AccordionItem;
Accordion.Panel = AccordionPanel;

// LegacyAccordion will be removed when v6 is released
export { LegacyAccordion, Accordion };
