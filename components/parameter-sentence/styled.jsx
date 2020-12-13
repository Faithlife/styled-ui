import styled from 'styled-components';

export const ParameterSentence = styled.form.attrs(({ isSearchForm, labelledBy }) => ({
	role: isSearchForm ? 'search' : 'form',
	'aria-labelledby': labelledBy,
}))`
	/* stylelint-disable no-empty-block https://github.com/stylelint/stylelint/issues/3494 */
`;

export const Fieldset = styled.fieldset`
	border: none;
	padding: 0;
	margin: 0;
`;
