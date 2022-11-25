import { BehaviorSubject } from 'rxjs'
import Router from 'next/router'
import { createHash } from 'crypto'
import {
	ActivateStudentDto,
	LoginDto, RegisterTeacherDto, Role
} from '../libs/dtos/user.dto'
import { saveToLocalStorage } from '../utils/handleLocalStorage'

export const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userToken')))

const host = process.env.BACKEND_URL
const port = process.env.RESERVATION_SERVER_PORT
const baseUrl = `http://${host}:${port}`

export const userService = {
	user: userSubject.asObservable(),
	get userValue() { return userSubject.value },
	hashPassword,
	getUserInfo,
	getStudentOrTeacherId,
	login,
	logout,
	register,
	activateAccount
}

function hashPassword(password: string): string{
	const hashedPassword = createHash('sha256').update(password).digest('hex')
	return hashedPassword
}

function getUserInfo() {
	if(userSubject.value) {
		// check if expiritation datetime is more (later) than 2 hours from now
		if (JSON.parse(Buffer.from(userSubject.value?.split('.')[1], 'base64').toString()).exp - 7200 < (Date.now() / 1000)) {
			localStorage.removeItem('userToken')
			Router.push('/login')
		}
		return JSON.parse(Buffer.from(userSubject.value?.split('.')[1], 'base64').toString())
	} else if (userSubject.value === null) {
		userSubject.next(JSON.parse(localStorage.getItem('userToken')))
	} else {
		return null
	}
}

async function getStudentOrTeacherId() {
	const profileUrl = `${baseUrl}/users/profile`
	const id = await fetch(profileUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${userSubject.value}`, // notice the Bearer before your token
		}
	}).then(async(response) => {
		const responseData = await response.json()
		if(response.ok) {
			return responseData.id
		}
	}).catch((e) => console.error(e))
	return id
}

function login(data, setErrorMessage, setCookies) {
	const user: LoginDto = { ...data }
	user.password = hashPassword(data.password)
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	}
	const loginUrl =`${baseUrl}/auth/login`

	fetch(loginUrl, requestOptions)
		.then(async(response) => {
			const responseData = await response.json()
			if (!response.ok) {
				const error =
					(responseData && responseData.message) || response.status
				setErrorMessage('Gegevens ongeldig')
				return Promise.reject(error)
			} else {
				userSubject.next(responseData.userToken)
				setErrorMessage('')
				saveToLocalStorage('userToken', responseData.userToken)
				setCookies('userToken', responseData.userToken)
				Router.push('/')
			}
		})
		.catch((error) => {
			setErrorMessage('Gegevens ongeldig')
			console.error(error)
		})
}
function register(data, setErrorMessage, setCookies) {
	const user: RegisterTeacherDto ={
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		number: data.number,
		password: data.password,
		role: Role.teacher
	}
	user.password = hashPassword(data.password)

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	}

	const registerUrl =`${baseUrl}/auth/register`
	fetch(registerUrl, requestOptions)
		.then(async(response) => {
			const responseData = await response.json()
			if (!response.ok) {
				const error =
					(responseData && responseData.message) || response.status
				setErrorMessage('Gegevens ongeldig')
				return Promise.reject(error)
			} else {
				userSubject.next(responseData.userToken)
				setErrorMessage('')
				saveToLocalStorage('useToken', responseData.userToken)
				setCookies('userToken', responseData.userToken)
				Router.push('/')
			}
		})
		.catch((error) => {
			setErrorMessage('Gegevens ongeldig')
			console.error(error)
		})
}
function logout() {
	localStorage.removeItem('user')
	// publish null to user subscribers
	userSubject.next(null)
	Router.push('/login')
}

function activateAccount(data, id, setErrorMessage, setCookies){
	const activateStudent: ActivateStudentDto = {
		number: data.number,
		password: hashPassword(data.password),
		activationToken: id
	}

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(activateStudent),
	}
	fetch(`${baseUrl}/auth/activatestudent`, requestOptions)
		.then(async(response) => {
			const responseData = await response.json()
			if (!response.ok) {
				const error =
				(responseData && responseData.message) || response.status
				setErrorMessage('Gegevens ongeldig')
				return Promise.reject(error)
			} else {
				userSubject.next(responseData.userToken)
				setErrorMessage('')
				localStorage.setItem('userToken', JSON.stringify(responseData.userToken))
				setCookies('userToken', responseData.userToken)
				Router.push('/')
			}
		})
		.catch((error) => {
			setErrorMessage('Gegevens ongeldig')
			console.error(error)
		})
}