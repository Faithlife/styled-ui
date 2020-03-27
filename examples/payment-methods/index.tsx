import React, { useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PaymentMethods, {
	BillingSummary,
	ShippingAddressForm,
	BillingForm,
} from '@faithlife/payment-methods';
import { SimpleToast, Accordion, theme } from '@faithlife/styled-ui';
import localizedResources from '../../packages/payment-methods/locales/en-US/resources.json';

const App = () => {
	const [expandedSections, setExpandedSections] = useState([0]);
	const [newProfileId, setNewProfileId] = useState();

	const toastRef = useRef<SimpleToast>();
	const setSystemMessage = useCallback((systemMessage: any) => {
		console.log({ ...systemMessage });

		if (toastRef.current) {
			toastRef.current.showMessage({ message: systemMessage.message });
		}
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

	const testInitialBillingProfile = {
		cardInfo: { nameOnCard: 'Test Name on Card', postalCode: '12345' },
		addressLine1: '1234 Happy St',
		addressLine2: null,
		city: 'Chandler',
		stateId: '17',
		countryId: '840',
	};

	const setCardInfoToSessionStorage = (billingProfileId, cardInfo) =>
		window.sessionStorage.setItem(billingProfileId, JSON.stringify({ ...cardInfo }));

	const getCardInfoFromSessionStorage = billingProfileId => {
		const json = window.sessionStorage.getItem(billingProfileId);
		const cardInfo = json ? JSON.parse(json) : null;

		return cardInfo;
	};

	// Example of how to override theme
	const myTheme = {
		...theme,
		colors: {
			...theme.colors,
			button: { ...theme.colors.button, primaryBackground: '#036ced', primaryHover: '#5f9fed' },
		},
	};

	return (
		<Accordion
			expandedSections={expandedSections}
			onExpansion={sections => setExpandedSections(sections)}
		>
			<Accordion.Item>
				<Accordion.Header>Payment Methods Selector</Accordion.Header>
				<Accordion.Panel>
					<SimpleToast ref={toastRef} showTime={2000} />
					<PaymentMethods
						onSelectedBillingProfileChange={(profile, action) =>
							setSystemMessage({ message: 'Default payment method changed', status: 'success' })
						}
						actAndHandleException={actAndHandleException}
						setSystemMessage={setSystemMessage}
						localizedResources={localizedResources}
						theme={myTheme}
					/>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.Header>Billing Form</Accordion.Header>
				<Accordion.Panel>
					<BillingForm
						actAndHandleException={actAndHandleException}
						onCommitBillingProfile={profile => {
							console.log(profile);
							alert(`New profile created. Billing profile id: ${profile.profileId}`);
							setNewProfileId(profile.profileId);
						}}
						localizedResources={localizedResources}
						setCardInfoToSessionStorage={setCardInfoToSessionStorage}
						theme={myTheme}
					></BillingForm>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.Header>Shipping Form</Accordion.Header>
				<Accordion.Panel>
					<ShippingAddressForm
						actAndHandleException={actAndHandleException}
						setSystemMessage={setSystemMessage}
						localizedResources={localizedResources}
						onCommitClicked={form => alert(form)}
						billingProfile={testInitialBillingProfile}
						theme={myTheme}
					></ShippingAddressForm>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.Header>
					Checkout Payment Methods Selector (Allows temporary profiles)
				</Accordion.Header>
				<Accordion.Panel>
					<SimpleToast ref={toastRef} showTime={2000} />
					<PaymentMethods
						onSelectedBillingProfileChange={(profile, action) =>
							setSystemMessage({ message: 'Default payment method changed', status: 'success' })
						}
						actAndHandleException={actAndHandleException}
						setSystemMessage={setSystemMessage}
						localizedResources={localizedResources}
						selectedBillingProfileId={newProfileId}
						getCardInfoFromSessionStorage={getCardInfoFromSessionStorage}
						setCardInfoToSessionStorage={setCardInfoToSessionStorage}
						handleSelectedProfileInvalid={() =>
							alert("Unable to find selected profile Id or it's not valid")
						}
						theme={myTheme}
					/>
				</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item>
				<Accordion.Header>Billing Summary</Accordion.Header>
				<Accordion.Panel>
					<BillingSummary
						// Example Billing Profile
						billingProfile={{
							profileId: '2936923',
							cardInfo: {
								creditCardNumber: '4343',
								creditCardProvider: 'AmEx',
								expirationMonth: 1,
								expirationYear: 2025,
							},
							eCheckInfo: null,
							isDefault: false,
							isExpired: false,
							nameOnCard: 'Billing Summary Test',
							organization: null,
							address1: '1234 Super Happy Place',
							address2: '',
							address3: '',
							address4: '',
							city: 'Gilbert',
							suburb: '',
							postalCode: '85233',
							countryId: 840,
							countryDisplay: 'UNITED STATES',
							stateId: 17,
							stateDisplay: 'Arizona',
							type: 'CreditCard',
							usageInfo: {
								pendingPrepubCount: 0,
								activeBidCount: 0,
								activeSubscriptionCount: 7,
								outstandingPaymentPlansCount: 0,
							},
						}}
					/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

ReactDOM.render(<App />, document.querySelector('#app'));
