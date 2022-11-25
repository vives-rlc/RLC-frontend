import { userSubject } from './user.service'

export const courseService = {
	getCourses,
	createCourse,
	getCourseById,
	updateCourseName,
	updateCourseStudents
}

const host = process.env.BACKEND_URL
const port = process.env.RESERVATION_SERVER_PORT
let token = userSubject.value
const baseUrl = `http://${host}:${port}`

function getCourses(setCourses) {
	// When navigating from login --> userSubject is not defined yet => get token from localStorage
	if(typeof window !== 'undefined') {
		const courseUrl =`${baseUrl}/courses`
		token = JSON.parse(localStorage.getItem('userToken'))
		fetch(courseUrl, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		}).then(async(response) => {
			if(response.ok) {
				const responseData = await response.json()
				setCourses(responseData)
			}
		}).catch((error) => {
			console.error(error)
		})
	} else {
		console.error('Vakken konden niet worden opgehaald')
	}

}

function createCourse(body, setErrorMessage, setSuccessMessage) {
	const courseUrl =`${baseUrl}/courses`
	fetch(courseUrl, {
		method: 'POST',
		headers: {
			Accept: 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
		},
		body: body
	}).then((res) => {
		if (res?.ok) {
			setErrorMessage('')
			const win: Window = window
			win.location = '/'
			setSuccessMessage('Nieuw vak werd aangemaakt! ')
		} else {
			setSuccessMessage('')
			console.error(res)
			setErrorMessage('Dat ging niet helemaal goed.')
		}
	}).catch((error) => {
		setErrorMessage('Dat ging niet helemaal goed. ')
		console.error(error)
	})
}

async function getCourseById(setResponse, courseId) {
	const courseUrl =`${baseUrl}/courses/${courseId}`
	fetch(courseUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`, // notice the Bearer before your token
		}
	}).then(async(response) => {
		if(response.ok) {
			const responseData = await response?.json()
			setResponse(responseData)
		}
	}).catch((error) => {
		console.error(error)
	})
}

async function updateCourseName(courseId, object, setCourseName) {
	fetch(`${baseUrl}/courses/${courseId}`, {
		method: 'PATCH',
		body: JSON.stringify(object),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	}).then(async(response) =>{
		if(response.ok){
			const responseData = await response.json()
			setCourseName(responseData.name)
		}
	}).catch((error) => {
		console.error(error)
	})
}

function updateCourseStudents(courseId, body, setErrorMessage, setSuccessMessage) {
	fetch(`${baseUrl}/courses/${courseId}/students`, {
		method: 'PUT',
		headers: {
			Accept: 'multipart/form-data',
			'Authorization': `Bearer ${token}`, // notice the Bearer before your token
		},
		body: body
	}).then((res) => {
		if (res) {
			if (res?.ok) {
				setErrorMessage('')
				const win: Window = window
				win.location = `/course/${courseId}`
				setSuccessMessage('Studenten werden toegevoegd! ')
			} else {
				setSuccessMessage('')
				setErrorMessage('Dat ging niet helemaal goed. ')
			}
		}
	}).catch((error) => {
		console.error(error)
		setErrorMessage('Dat ging niet helemaal goed. ')
	})
}