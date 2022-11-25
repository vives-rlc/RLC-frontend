import dateFormat, { i18n } from 'dateformat'
import { oneMinuteInMilliseconds } from '../libs/variables'

i18n.monthNames = [
	'jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
	'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'
]

export function formatDateUS(date) {
	return dateFormat(date, 'mmmm d, yyyy')
}

export function diffToToday(date) {
	const parseDate = new Date(date)
	const today = new Date()
	return parseDate.getTime() - today.getTime()
}

export function formatDateTimeReservation(dateTime) {
	return dateFormat (dateTime, 'd mmmm yyyy - HuMM')
}

export function formateDateTimeToDate(dateTime) {
	return dateFormat (dateTime, 'd-mm-yyyy')
}

export function formatDateTimeToInputDate(dateTime) {
	return dateFormat (dateTime, 'yyyy-mm-dd')
}

export function formatDateTimeToInputTime(dateTime) {
	return dateFormat (dateTime, 'HH:MM')
}

export function formatDateAvailability(dateTime) {
	return dateFormat (dateTime, 'd mmmm')
}

export function formatDateTimeToTime(dateTime) {
	return dateFormat(dateTime, 'HuMM')
}

export function minutesLeft(startTime) {
	return Math.round(diffToToday(startTime))/ oneMinuteInMilliseconds
}