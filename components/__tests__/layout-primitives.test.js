import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';

describe('Layout Primitives', () => {
	it('should be truthy', () => {
		expect.hasAssertions();

		expect(Box).toBeTruthy();
		expect(Stack).toBeTruthy();
		expect(Text).toBeTruthy();
	});
});
