/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/demo-button/container.jsx';
import secondaryButtonTheme from '../components/demo-button/secondary-theme.less';
import Checkbox from '../components/check-box/container.jsx';
import secondaryCheckboxTheme from '../components/check-box/secondary-theme.less';

storiesOf('Button', module)
	.add('primary with text', () => <Button onClick={action('clicked')}>Toggle shadow</Button>)
	.add('secondary with text', () => (
		<Button onClick={action('clicked')} theme={secondaryButtonTheme}>
			Toggle shadow
		</Button>
	))
	.add('with some emoji', () => (
		<Button onClick={action('clicked')}>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</Button>
	));

storiesOf('Checkbox', module)
	.add('primary with text', () => <Checkbox />)
	.add('secondary with text', () => <Checkbox theme={secondaryCheckboxTheme} />);
