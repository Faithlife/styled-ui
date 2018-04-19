import React from 'react';
import { Button } from '../../components';
import docs from './ok-cancel.md';
import * as Styled from './styled.jsx';

export default function DemoContainer() {
	return (
		<Styled.Demos>
			<Styled.DemoRow>
				<Styled.ButtonWrapper>
					<Button onClick={() => {}} primaryOutline medium>
						Cancel
					</Button>
				</Styled.ButtonWrapper>
				<Styled.ButtonWrapper>
					<Button onClick={() => {}} primary medium>
						Okay
					</Button>
				</Styled.ButtonWrapper>
			</Styled.DemoRow>
			<Styled.Documentation dangerouslySetInnerHTML={{ __html: docs }} />
		</Styled.Demos>
	);
}
