import PropTypes from 'prop-types';

export const dateFunctionProps = PropTypes.shape({
	startOfWeek: PropTypes.func.isRequired,
	startOfMonth: PropTypes.func.isRequired,
	endOfWeek: PropTypes.func.isRequired,
	endOfMonth: PropTypes.func.isRequired,
	getYear: PropTypes.func.isRequired,
	getMonth: PropTypes.func.isRequired,
	getDate: PropTypes.func.isRequired,
	addWeeks: PropTypes.func.isRequired,
	addMonths: PropTypes.func.isRequired,
	subMonths: PropTypes.func.isRequired,
	isBefore: PropTypes.func.isRequired,
	format: PropTypes.func.isRequired,
	isValid: PropTypes.func.isRequired,
}).isRequired;
