// Original image created with dashed border generator: https://kovart.github.io/dashed-border-generator/

export const getBorderImage = ({ borderColor, borderRadius }) => {
	borderColor = borderColor.replace('#', '%23');
	return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${borderRadius}' ry='${borderRadius}' stroke='${borderColor}' stroke-width='1' stroke-dasharray='7%2c 6' stroke-dashoffset='8' stroke-linecap='round'/%3e%3c/svg%3e")`;
};
