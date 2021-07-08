import format from 'date-fns/format';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import addYears from 'date-fns/addYears';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import isValid from 'date-fns/isValid';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDay from 'date-fns/getDay';

import enUS from 'date-fns/locale/en-US';

export default class DateFunctions {
	version = '1';
	locale = enUS;
	todaysDate = null;

	abbrv = {
		narrow: 'narrow',
		abbreviated: 'abbreviated',
		short: 'short',
		wide: 'wide',
	};

	constructor({ locale } = {}) {
		this.locale = locale ?? this.locale;
		this.todaysDate = new Date();
	}

	getMonth = date => {
		return getMonth(date);
	};

	getYear = date => {
		return getYear(date);
	};

	getEachDayOfMonthByWeek = date => {
		return eachWeekOfInterval(
			{
				start: startOfMonth(date),
				end: endOfMonth(date),
			},
			{ locale: this.locale },
		).map(day =>
			eachDayOfInterval(
				{
					start: startOfWeek(day, {
						locale: this.locale,
					}),
					end: endOfWeek(day, {
						locale: this.locale,
					}),
				},
				{ locale: this.locale },
			),
		);
	};

	isSameDay = (firstDate, secondDate) => {
		return isSameDay(firstDate, secondDate);
	};

	isSameMonth = (firstDate, secondDate) => {
		return isSameMonth(firstDate, secondDate, { locale: this.locale });
	};

	getNextDay = date => {
		return addDays(date, 1);
	};

	getPrevDay = date => {
		return addDays(date, -1);
	};

	getNextWeek = date => {
		return addWeeks(date, 1);
	};

	getPrevWeek = date => {
		return addWeeks(date, -1);
	};

	getNextMonth = date => {
		return addMonths(date, 1);
	};

	getPrevMonth = date => {
		return addMonths(date, -1);
	};

	getNextYear = date => {
		return addYears(date, 1);
	};

	getPrevYear = date => {
		return addYears(date, -1);
	};

	isValid = value => {
		return isValid(value);
	};

	formatTitle = date => {
		return format(date, 'MMMM yyyy', { locale: this.locale });
	};

	formatDay = date => {
		return format(date, 'd', { locale: this.locale });
	};

	getDOWName = (dayIndex, abbrev = this.abbrv.wide) => {
		return this.locale.localize.day(dayIndex, { locale: this.locale, width: abbrev });
	};

	startOfWeek = date => {
		return startOfWeek(date, { locale: this.locale });
	};

	endOfWeek = date => {
		return endOfWeek(date, { locale: this.locale });
	};

	getDayOfWeek = date => {
		return getDay(date);
	};

	getWeekDayIndexArray = () => {
		const now = new Date();
		return eachDayOfInterval(
			{
				start: startOfWeek(now, {
					locale: this.locale,
				}),
				end: endOfWeek(now, {
					locale: this.locale,
				}),
			},
			{ locale: this.locale },
		).map(this.getDayOfWeek);
	};
}
