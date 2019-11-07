import { deprecateComponent } from '../utils';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';

export const v6ImportHelpText = `You can opt into this new API by importing { Modal } from @faithlife/styled-ui/v6
Learn more at https://faithlife.github.io/styled-ui/#/modal/v6`;

export const LegacyModalContent = deprecateComponent(
	ModalContent,
	`ModalContent will be moving to Modal.Content in Styled-UI version 6.\n${v6ImportHelpText}`,
);

export const LegacyModalFooter = deprecateComponent(
	ModalFooter,
	`ModalFooter will be moving to Modal.Footer in Styled-UI version 6.\n${v6ImportHelpText}`,
);
