import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import * as Styled from './styled';

export function ListNavigationControls({
	onNavigateNext,
	onNavigatePrev,
	canNavigateNext,
	canNavigatePrev,
}) {
	return (
		<Styled.NavContainer>
			<Styled.ButtonSpacer>
				<Button
					minor
					small
					condensed
					onClick={onNavigatePrev}
					disabled={!canNavigatePrev}
					icon={<Styled.CaretLeftIcon />}
				/>
			</Styled.ButtonSpacer>
			<Button
				minor
				small
				condensed
				onClick={onNavigateNext}
				disabled={!canNavigateNext}
				icon={<Styled.CaretRightIcon />}
			/>
		</Styled.NavContainer>
	);
}

ListNavigationControls.propTypes = {
	onNavigateNext: PropTypes.func.isRequired,
	onNavigatePrev: PropTypes.func.isRequired,
	canNavigateNext: PropTypes.bool,
	canNavigatePrev: PropTypes.bool,
};
