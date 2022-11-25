import Router from 'next/router'
import { userSubject } from './user.service'

export const timeslotService = {
	getAllTimeslots,
	getTimeslotById,
	updateTimeslot
}

const host = process.env.BACKEND_URL
const port = process.env.RESERVATION_SERVER_PORT
const baseUrl = `http://${host}:${port}`
const token = userSubject.value

function getAllTimeslots(teacherId, setAllTimeslots) {
	const timeslotsUrl = `${baseUrl}/teachers/${teacherId}/alltimeslots`
	fetch(timeslotsUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	}).then(async(response) => {
		if(response.ok) {
			const data = await response.json()
			setAllTimeslots(data)
		} else {
			console.error(response)
		}
	}).catch((error) => console.error(error))
}

function getTimeslotById(timeslotId, setResponse) {
	fetch(`${baseUrl}/timeslots/${timeslotId}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}).then(async(response) => {
		if(response.ok) {
			const data = await response.json()
			setResponse(data)
		} else {
			console.error(response)
		}
	}).catch((error) => console.error(error))
}

function updateTimeslot(timeslotId, body, setErrorMessage, setSuccessMessage) {
	fetch(`${baseUrl}/timeslots/${timeslotId}`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(body)
	}).then((res) => {
		if (res?.ok) {
			setErrorMessage('')
			setSuccessMessage('Tijdslot succesvol gewijzigd!')
			Router.back()
		} else {
			setSuccessMessage('')
			setErrorMessage('Dat ging niet helemaal goed.')
		}
	})
		.catch((error) => {
			console.error(error)
		})
}