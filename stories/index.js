/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/demo-button/container.jsx';
import secondary from '../components/demo-button/secondary-theme.less';
import Checkbox from '../components/check-box/index.jsx';

storiesOf('Button', module)
	.add('primary with text', () => <Button onClick={action('clicked')}>Toggle shadow</Button>)
	.add('secondary with text', () => (
		<Button onClick={action('clicked')} theme={secondary}>
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

storiesOf('Checkbox', module).add('with text', () => <Checkbox />);
