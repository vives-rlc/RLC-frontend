import Router from 'next/router'
import {
	AddTimeslotsToLabDto, CreateTimeslotDto, TimeslotDto
} from '../libs/dtos/timeslot.dto'
import { userSubject } from './user.service'

export const labService = {
	getLabs,
	createLab,
	getConnectionData,
	updateTimeslotIsCompleted,
	getLaboById,
	updateLab,
	addTimeslotsToLab
}

const host = process.env.BACKEND_URL
const port = process.env.RESERVATION_SERVER_PORT
const baseUrl = `http://${host}:${port}`
const token = userSubject.value

function getLabs(setLabs) {
	const labsUrl = `${baseUrl}/labs`
	fetch(labsUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`, // notice the Bearer before your token
		}
	}).then(async(response) => {
		const responseData = await response.json()
		if(response.ok) {
			setLabs(responseData)
		}
	}).catch((error) => {
		console.error(error)
	})
}

function createLab(object, setErrorMessage, setSuccessMessage) {
	const labUrl = `${baseUrl}/labs`
	fetch(labUrl, {
		method: 'POST',
		body: object,
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	}).then((res) => {
		if (res.ok) {
			setErrorMessage('')
			setSuccessMessage('Labo succesvol toegevoegd! ')
			Router.push('/')
		} else {
			setSuccessMessage('')
			setErrorMessage('Dat ging niet helemaal goed. ')
		}
	}).catch((error) => {
		console.error(error)
	})
}

function getConnectionData(setResult, timeslotId) {
	fetch(`${baseUrl}/guacd/connection/${timeslotId}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`, // notice the Bearer before your token
		}
	})
		.then(async(response) => {
			if(response.ok) {
				const responseData = await response.json()
				setResult(responseData)
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

function updateTimeslotIsCompleted(timeslotId) {
	fetch(`${baseUrl}/timeslots/${timeslotId}`, {
		method: 'PATCH',
		body: JSON.stringify({
			'isCompleted': true
		}),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	// eslint-disable-next-line no-return-await
	}).then(async(response) => await response.json()).catch((error) => {
		console.error(error)
	}).catch((error) => {
		console.error(error)
	})
}

function getLaboById(setResponse, laboId) {
	const laboUrl=`${baseUrl}/labs/${laboId}`
	fetch(laboUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	}).then(async(response) => {
		if (response?.ok) {
			const responseData = await response.json()
			setResponse(responseData)
		}
	}).catch((error) => {
		console.error(error)
	})
}

function updateLab(labId, body, setErrorMessage, setSuccessMessage) {
	console.log(body)
	fetch(`${baseUrl}/labs/${labId}`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: body
	}).then((res) => {
		console.log(res)
		if (res?.ok) {
			setErrorMessage('')
			Router.reload()
		} else {
			setSuccessMessage('')
			setErrorMessage('Dat ging niet helemaal goed.')
		}
	})
		.catch((error) => {
			console.error(error)
		})
}
function addTimeslotsToLab(labId, object, setErrorMessage, setSuccessMessage) {
	const laboTimeslotsUrl = `${baseUrl}/timeslots`
	const timeslot: TimeslotDto = {
		startTime: new Date(`${object.date}T${object.startTime}:00`),
		endTime: new Date(`${object.date}T${object.endTime}:00`),
		isReserved: false,
		isCompleted: false
	}

	const addTimeSlotToLab: AddTimeslotsToLabDto = {
		labId: labId,
		timeslots: [timeslot]
	}

	fetch(laboTimeslotsUrl, {
		method: 'POST',
		body: JSON.stringify(addTimeSlotToLab),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	}).then((res) => {
		if (res.ok) {
			setErrorMessage('')
			setSuccessMessage('Tijdslot succesvol toegevoegd aan labo! ')
			Router.push(`/labo/${labId}`)
		} else {
			setSuccessMessage('')
			setErrorMessage('Dat ging niet helemaal goed. Probeer even opnieuw.')
		}
	}).catch((error) => {
		console.error(error)
	})
}