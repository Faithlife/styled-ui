import React from 'react';
import PropTypes from 'prop-types';
import { VisuallyHiddenLabel } from '../hidden-label';
import { useId } from '../shared-hooks';
import * as Styled from './styled';

/**
 * If an author uses a script to submit a form based on a user action that would otherwise not trigger an onsubmit event
 * (for example, a form submission triggered by the user changing a form element's value),
 * the author SHOULD provide the user with advance notification of the behavior.
 * -- https://www.w3.org/TR/wai-aria-1.1/#form
 */
export function ParameterSentence({ children, isSearchForm, accessibilityFormLabel, labelledBy }) {
	const id = useId();
	const labelId = labelledBy || `parameterSentence:${id}`;
	return (
		<Styled.ParameterSentence isSearchForm={isSearchForm} labelledBy={labelId}>
			<Styled.Fieldset>
				{!labelledBy && (
					<VisuallyHiddenLabel as="legend" id={labelId}>
						{accessibilityFormLabel}
					</VisuallyHiddenLabel>
				)}
				{children}
			</Styled.Fieldset>
		</Styled.ParameterSentence>
	);
}

ParameterSentence.propTypes = {
	children: PropTypes.node.isRequired,
	isSearchForm: PropTypes.bool,
	/** A hidden label that will be applied to the parameter sentence (required is labelledBy is not supplied)*/
	accessibilityFormLabel: PropTypes.string,
	/** The id of a label that describes the parameter sentence (required is accessibilityFormLabel is not supplied) */
	labelledBy: PropTypes.string,
};
