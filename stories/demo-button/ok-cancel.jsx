import React from 'react';
import { Button } from '../../components';
import styles from './story-styles.less';
import docs from './ok-cancel.md';

export default function DemoContainer() {
	return (
		<div className={styles.demos}>
			<div className={styles.demoRow}>
				<div className={styles.buttonWrapper}>
					<Button onClick={() => {}} variations={['primaryOutline', 'medium']}>
						Cancel
					</Button>
				</div>
				<div className={styles.buttonWrapper}>
					<Button onClick={() => {}} variations={['primary', 'medium']}>
						Okay
					</Button>
				</div>
			</div>
			<div className={styles.documentation} dangerouslySetInnerHTML={{ __html: docs }} />
		</div>
	);
}
