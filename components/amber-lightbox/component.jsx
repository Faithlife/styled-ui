/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { DropZone } from '../drop-zone';
import { Tab } from './tab';
import * as Styled from './styled';

export class AmberLightbox extends PureComponent {
	static propTypes = {
		/* tabs: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				vaultId: PropTypes.number.isRequired,
				filter: PropTypes.string,
				viewStyle: PropTypes.string,
			}),
		),*/
		// fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
		onFileSelected: PropTypes.func.isRequired,
		allowMultiSelect: PropTypes.bool,
		hideNativeTab: PropTypes.bool,
		localizationProps: PropTypes.shape({
			addText: PropTypes.string,
			cancelText: PropTypes.string,
		}),
	};

	fileInputRef = React.createRef();

	handleBrowseFilesClick = () => {
		this.fileInputRef.current.click();
	};

	handleUploadWithFileInput = event => {
		event.stopPropagation();
		event.preventDefault();

		const { onFileSelected } = this.props;
		const files =
			(event.dataTransfer && event.dataTransfer.files) || (event.target && event.target.files);

		onFileSelected(files[0]);

		// reset the input's value so selecting the same file twice works
		this.fileInputRef.current.value = '';
	};

	render() {
		const addText = this.props.localizationProps.addText
			? this.props.localizationProps.addText
			: 'Add';
		const cancelText = this.props.localizationProps.cancelText
			? this.props.localizationProps.cancelText
			: 'Cancel';
		return (
			<Styled.Container>
				<Styled.Title>Add File</Styled.Title>
				<Styled.NativeContainer>
					<DropZone
						onDrop={dropEvent => {
							dropEvent.preventDefault();
							dropEvent.stopPropagation();
							console.log(dropEvent.dataTransfer.files[0]);
							this.props.onFileSelected(dropEvent.dataTransfer.files[0]);
						}}
					>
						<Styled.DragDropContainer>
							<Styled.SvgContainer>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
									<path
										d="M12.613 2.706C12.58 2.606 11.993 1 10 1H7C5 1 4.416 2.617 4.385 2.71c-.03.092-.116.29-.287.29h-1.67C.81 3.023 0 3.866 0 5.6v5.8C0 12.57.81 14 2.43 14h12.14c1.62 0 2.43-.866 2.43-2.6V5.6c0-1.734-.81-2.6-2.43-2.6h-1.7c-.144 0-.227-.203-.257-.294"
										fill="#7a7a7a"
									/>
									<path
										d="M12 8.5C12 6.566 10.434 5 8.5 5S5 6.566 5 8.5 6.566 12 8.5 12 12 10.434 12 8.5"
										fill="#FFF"
									/>
									<path
										d="M10.75 8.5c0-1.243-1.007-2.25-2.25-2.25S6.25 7.257 6.25 8.5s1.007 2.25 2.25 2.25 2.25-1.007 2.25-2.25"
										fill="#7a7a7a"
									/>
									<path
										d="M15.75 6.5c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25.56 1.25 1.25 1.25 1.25-.56 1.25-1.25"
										fill="#FFF"
									/>
								</svg>
							</Styled.SvgContainer>
							<Styled.DragDropText>Drag and drop to upload image</Styled.DragDropText>
							<Button primaryTransparent onClick={this.handleBrowseFilesClick}>
								or browse files
							</Button>
							<br />
							<Styled.FileInputLabel>
								<input
									ref={this.fileInputRef}
									onChange={this.handleUploadWithFileInput}
									type="file"
									name="file"
								/>
							</Styled.FileInputLabel>
							<Styled.MinSizeLabel>minimum image size: 800 x 400</Styled.MinSizeLabel>
						</Styled.DragDropContainer>
					</DropZone>
				</Styled.NativeContainer>
				<Styled.ButtonSection>
					<Styled.ButtonContainer>
						<Button primary small>
							{addText}
						</Button>
					</Styled.ButtonContainer>
					<Styled.ButtonContainer>
						<Button primaryOutline small>
							{cancelText}
						</Button>
					</Styled.ButtonContainer>
				</Styled.ButtonSection>

				<Tab
					// onFileSelected
					title={'my vault'}
					vaultId={5698187}
					filter={'kind: photo'}
					viewStyle={'embeded'}
				/>
			</Styled.Container>
		);
	}
}

// mime types
// view but not upload
// standard term for localization
