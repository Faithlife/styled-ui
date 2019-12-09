import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import PaymentMethods from '@faithlife/payment-methods';
import { SimpleToast } from '@faithlife/styled-ui';

const App = () => {
	const toastRef = useRef<SimpleToast>();
	const setSystemMessage = useCallback((systemMessage: any) => {
		console.log({ ...systemMessage });
		toastRef.current.showMessage({ message: systemMessage.message });
	}, []);

	const actAndHandleException = useCallback(
		async <T extends any>(
			action: () => Promise<T>,
			actionDescription: string
		): Promise<T | undefined> => {
			try {
				return await action();
			} catch (e) {
				console.error(e);
				if (e.message !== undefined && e.status !== undefined) {
					setSystemMessage({
						message: e.message,
						status: e.status,
					});
				} else {
					setSystemMessage({
						message: `Unable to ${actionDescription} at this time. Please try again later.`,
						status: 'error',
					});
				}
			}
		},
		[setSystemMessage]
	);
	return (
		<>
			<PaymentMethods
				onSelectedBillingProfileChange={(profile, action) =>
					setSystemMessage({ message: 'Default payment method changed', status: 'success' })
				}
				actAndHandleException={actAndHandleException}
				setSystemMessage={setSystemMessage}
			/>
			<SimpleToast ref={toastRef} showTime={2000} />
		</>
	);
};

ReactDOM.render(<App />, document.querySelector('#app'));
