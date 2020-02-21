import { GetTypedLocalization } from '@faithlife/react-ui';
import ILocalizedResources from './typings/ILocalizedResources';

const { LocalizationProvider, Localize, Text, useLocalization } = GetTypedLocalization<
	ILocalizedResources
>();

export { LocalizationProvider, Localize, Text, useLocalization };
