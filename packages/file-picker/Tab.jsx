import PropTypes from 'prop-types';

export const Tab = ({ children }) => children;

Tab.defaultProps = {
	padding: 4,
};

Tab.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	padding: PropTypes.number,
};
