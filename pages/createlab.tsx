import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { escape } from 'html-escaper'
import Router from 'next/router'

// Components
import Card from '../components/atoms/Card'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Input from '../components/atoms/Input'
import PageTitle from '../components/atoms/PageTitle'
import Button from '../components/atoms/SendButton/SendButton'
import Textarea from '../components/atoms/Textarea'
import Select from '../components/atoms/Select'

// Templates
import Layout from '../components/templates'

// Styles
import styles from '../styles/pages/CreateLab.module.scss'

// Dtos
import { CreateLabDto } from '../libs/dtos/lab.dto'
import { CreateTimeslotDto } from '../libs/dtos/timeslot.dto'
import { Protocol } from '../libs/dtos/connection.dto'
import { labService } from '../services/lab.service'
import { courseService } from '../services/course.service'
import { encrypt } from '../utils/encryptDecrypt'

const CreateLab = () => {
	const array = []
	const {
		register, handleSubmit, formState: {
			errors,
		}
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			sway: '',
			name: '',
			connection: {
				userName: '',
				password: '',
				name: '',
				protocol: '',
				hostname: '',
				port: null,
			},
			course: {
				id: ''
			},
			timeslots: array
		},
	})

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [nrTimeSlots, setNrTimeslots] = useState(0)
	const [courses, setCourses] = useState([])
	const [course, setCourse] = useState(null)

	const id = Object.keys(Router.query)[0]

	useEffect(() => {
		courseService.getCourses(setCourses)
		id && courseService.getCourseById(setCourse, id)
	}, [id])

	const onSubmit = (data) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			const timeslots: CreateTimeslotDto[] = data.timeslots.map((timeslot) => {
				return {
					isReserved: false,
					startTime: new Date(`${timeslot.date}T${timeslot.startTime}:00`),
					endTime: new Date(`${timeslot.date}T${timeslot.endTime}:00`)
				}
			})
			const createLabDTO: CreateLabDto = {
				connection: {
					userName: data?.connection?.userName,
					password: data?.connection?.password ? encrypt(data?.connection?.password) : null,
					hostname: data?.connection?.hostname,
					name: data?.connection?.name,
					port: data?.connection?.port,
					protocol: data?.connection?.protocol
				},
				name: data.name,
				course: { id: course ? course.id : data.course.id },
				sway: escape((data.sway).replace(/"/g, '\'')),
				timeslots: timeslots
			}
			const body = JSON.stringify(createLabDTO)
			labService.createLab(body, setErrorMessage, setSuccessMessage)
		}
	}


	const getTimeSlots = () => {
		for (let index = 0; index < nrTimeSlots; index++) {
			array.push(<fieldset name={ `timeslots[${index}]` } key={ `timeslots[${index}]` }>
				{/* create object for each timeslot, append to timeslots before posting data */ }
				<Input
					label='Datum'
					minDate={ new Date().toISOString().split('T')[0] }
					name={ `timeslots[${index}].date` }
					type='date'
					register={ register }
					isRequired
				/>
				<Input
					label='Starttijd'
					type='time'
					name={ `timeslots[${index}].startTime` }
					register={ register }
					isRequired
				/>
				<Input
					label='Eindtijd'
					name={ `timeslots[${index}].endTime` }
					type='time'
					register={ register }
					isRequired
				/>
				<input type="checkbox" id="honey" className='hidden' />
				<hr />
			</fieldset>)

		}
		return array.map((item, idx) => {
			return <div key={ idx }>{ item }</div>
		})
	}


	return (
		<Layout
			title="Voeg vak toe - Remote Lab Connection | Vives"
		>
			<div className={ styles.createLab }>
				<BackgroundStripes />
				<Card>
					<PageTitle title="Labo toevoegen" />
					<form onSubmit={ handleSubmit(onSubmit) } noValidate>
						{
							course ? <h2><i>Vak: </i>{ course.name }</h2> : <Select
								label='Vak'
								options={ courses.map((item) => { return { label: item.name, value: item.id } }) }
								name='course.id'
								register={ register }
								isRequired
								error={
									(errors.course?.id && 'De naam van het vak invullen, is verplicht.')
								}
							/>
						}
						<Input
							label='Naam van het labo'
							name='name'
							placeholder='Computer networks - labo 1'
							register={ register }
							isRequired
							error={
								(errors.name && 'De naam van het labo invullen is verplicht.')
							}
						/>

						<h2>Connection settings</h2>
						<Input
							label='Naam van de connectie'
							name='connection.name'
							register={ register }
							placeholder='Router 1'
							isRequired={ false }
						/>
						<Select
							label='Protocol'
							name='connection.protocol'
							register={ register }
							options={ Object.values(Protocol) }
							defaultSelect={ Protocol.telnet }
							isRequired
							error={
								(errors.connection?.protocol && 'Het protocol invullen, is verplicht.')
							}
						/>
						<Input
							label='Hostname'
							name='connection.hostname'
							register={ register }
							placeholder='192.160.8.2'
							isRequired
							error={
								(errors.connection?.hostname && 'De hostname invullen, is verplicht.')
							}
						/>
						<Input
							label='Poort'
							name='connection.port'
							register={ register }
							placeholder='8909'
							type='number'
							isRequired
							error={
								(errors.connection?.port && 'De poort invullen, is verplicht.')
							}
						/>
						<Input
							label='Gebruikersnaam'
							name='connection.userName'
							register={ register }
							placeholder='user'
							isRequired={ false }
						/>
						<Input
							label='Wachtwoord'
							name='connection.password'
							register={ register }
							placeholder='*****'
							type='password'
							isRequired={ false }
						/>

						<h2>Instructies</h2>
						<Textarea
							label='Sway embed code'
							name='sway'
							register={ register }
							placeholder='<iframe ...> ... </iframe>'
						/>

						<h2>Tijdsloten toevoegen</h2>
						{ getTimeSlots() }
						<Button onClick={ (e) => { e.preventDefault(); setNrTimeslots(nrTimeSlots + 1) } } variant='secondary'>+ Tijdsslot toevoegen</Button>
						<input type="checkbox" id="honey" className='hidden' />
						<Button>Voeg toe</Button>
						<p>{ successMessage }</p>
						<p className='error'>{ errorMessage }</p>
					</form>
				</Card>
			</div>
		</Layout>
	)
}

export default CreateLab