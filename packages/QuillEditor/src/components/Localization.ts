import { GetTypedLocalization } from '@faithlife/react-ui';
import localizedResources from '../locales/en-US/resources.json';

const { LocalizationProvider, Localize, Text, useLocalization } = GetTypedLocalization<
	typeof localizedResources
>();

export { LocalizationProvider, Localize, Text, useLocalization };
