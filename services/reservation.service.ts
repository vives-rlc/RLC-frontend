import Router from 'next/router'
import { userSubject } from './user.service'

export const reservationService ={
	getFutureReservations,
	createReservation
}

const host = process.env.BACKEND_URL
const port = process.env.RESERVATION_SERVER_PORT
const baseUrl = `http://${host}:${port}`
let token = userSubject.value

function getFutureReservations(studentId, setFutureReservation) {
	if(typeof window !== 'undefined') {
		token = JSON.parse(localStorage.getItem('userToken'))
		const futureReservationUrl = `${baseUrl}/students/${studentId}/myfuturereservations`
		fetch(futureReservationUrl, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		}).then(async(response) => {
			const responseData = await response.json()
			if(response.ok) {
				setFutureReservation(responseData)
			}
		}).catch((e) => {return console.error(e)})
	} else {
		console.error('Toekomstige reservaties konden niet worden opgehaald')
	}
}

function createReservation(body, setErrorMessage, setSuccessMessage ) {
	const reservationUrl = `${baseUrl}/reservations`
	fetch(reservationUrl, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: body
	}).then((res) => {
		if(res?.ok) {
			setErrorMessage('')
			setSuccessMessage('Reservatie van tijdslot geslaagd')
			Router.back()
		} else {
			setErrorMessage('Dat ging niet helemaal goed. Probeer later even opnieuw.')
			setSuccessMessage('')
			console.error({ res })
		}
	}).catch((e) => console.error(e))
}