# PaymentMethods

The purpose of this component is to provide a unified Payment Methods Selector component across Faithlife Apps.

- [Getting Started](#getting-started)
- [Scope](#scope)
- [API reference](#api-reference)

## Getting started

1. Import the component

```jsx
import PaymentMethods from '@faithlife/payment-methods';
```

2. Use the component

```jsx
const MyComponent = () => {

	// Provides a hook into consuming apps messaging system
	const setSystemMessage = useCallback((systemMessage: any) => {
		console.log({ ...systemMessage });
		toastRef.current.showMessage({ message: systemMessage.message });
	}, []);

	// Adds try/catch and await logic
	const actAndHandleException = useCallback(
		async (action, actionDescription) => {
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

	// Do whatever you want to do with the new selected profile
	const handleSelectedProfileChanged = useCallback(
		({ billingProfileDto }) => {
			const setDefaultBillingProfile = async billingProfileId => {
				try {
					await OrdersClient.setDefaultBillingProfile(billingProfileId);
					notify(resources.DefaultProfileUpdated, severity.success);
				} catch (error) {
					notify(resources.ProblemUpdating, severity.error);
				}
			};

			setDefaultBillingProfile(billingProfileDto.profileId);
		},
		[resources]
	);
	...
	return (
		<FaithlifePaymentMethods
			onSelectedBillingProfileChange={handleSelectedProfileChanged}
			actAndHandleException={actAndHandleException}
			setSystemMessage={setSystemMessage}
		/>
	);
}
```

## Scope

The following are areas where payment methods selector could possibly be used

- Skeletor - [Account Billing](https://git.faithlife.dev/Logos/Skeletor/blob/master/src/Skeletor/Themes/faithlife-ecommerce/Views/Billing/BillingProfiles.cshtml)
- Skeletor - [Cart Checkout](https://git.faithlife.dev/Logos/Skeletor/blob/master/src/Skeletor/Areas/Cart/Views/Shared/_BillingProfileWidget.cshtml)
- Skeletor - [Account Subscriptions](https://git.faithlife.dev/Logos/Skeletor/blob/master/src/Skeletor/Themes/faithlife-ecommerce/scripts/site/components/subscription-management/edit-subscription.jsx#L72)
- Skeletor - [Account PaymentPlans](https://git.faithlife.dev/Logos/Skeletor/blob/master/src/Skeletor/Themes/faithlife-ecommerce/scripts/site/components/payment-plans/payment-plan-billing-editor.jsx)

### After adding support for Bank Accounts and Vantiv/Submerchant Profiles

- Submerchants - [Virtual Terminal](https://git.faithlife.dev/Logos/Submerchant.Web/tree/master/packages/submerchant-virtual-terminal/components/billing-profiles)
- Event Checkout

## API reference

### Exports

```
import PaymentMethods from '@faithlife/payment-methods';

```

### Props

#### PaymentMethods

- `onSelectedBillingProfileChange` - `function`: Called when clicks a new payment method radio button
- `actAndHandleException` - `function`: Called in functions that have network calls that could fail and need awaiting
- `setSystemMessage` - `function`: Called when component needs to display a message to user after actions were taken
