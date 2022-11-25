import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { escape } from 'html-escaper'

// Components
import Card from '../components/atoms/Card'
import DragAndDropInput from '../components/atoms/DragAndDropInput'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Input from '../components/atoms/Input'
import PageTitle from '../components/atoms/PageTitle'
import Button from '../components/atoms/SendButton/SendButton'
import Textarea from '../components/atoms/Textarea'
import Select from '../components/atoms/Select'

// Templates
import Layout from '../components/templates'

// Styles
import styles from '../styles/pages/CreateCourse.module.scss'

// Helpers
import { onFileChange } from '../utils/uploadFile'

// Types
import { Protocol } from '../libs/dtos/connection.dto'
import { userService } from '../services/user.service'
import { CreateTimeslotDto } from '../libs/dtos/timeslot.dto'
import { CreateLabDto } from '../libs/dtos/lab.dto'
import { courseService } from '../services/course.service'
import { CreateCourseDto } from '../libs/dtos/course.dto'
import { encrypt } from '../utils/encryptDecrypt'

type FormData = {
	name: string,
	labs: CreateLabDto[],
}
const CreateCoursePage = () => {
	const array = []

	const {
		register, handleSubmit, formState:
		{
			errors, isValid,
		}
	} = useForm({
		mode: 'onTouched', defaultValues: {
			name: '',
			labs: array
		}
	})

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const [fileName, setFileName] = useState('')
	const [fileFilled, setFileFilled] = useState(false)
	const [file, setFile] = useState(null)

	const [nrLabos, setNrLabos] = useState(0)
	const [teacherId, setTeacherId] = useState('')

	useEffect(() => {
		userService.getStudentOrTeacherId().then((id) => setTeacherId(id)).catch((e) => { console.log(e) })
	}, [teacherId])



	const updateNrTimeslots = (indexItemToUpdate, updateValue) => {
		const newItems = nrTimeSlots.map((item, index) => {
			if (indexItemToUpdate === index) {
				return item = updateValue
			}
			return item
		})
		setNrTimeslots(newItems)
	}
	const onSubmit = (data: FormData) => {
		const labs: CreateLabDto[] = data.labs.map(({
			connection, sway, name, timeslots
		}) => {
			const convertedTimeslots: CreateTimeslotDto[] = timeslots.map((timeslot) => {
				return {
					isReserved: false,
					startTime: new Date(`${timeslot.date}T${timeslot.startTime}:00`),
					endTime: new Date(`${timeslot.date}T${timeslot.endTime}:00`)
				}
			})
			return {
				connection: {
					userName: connection?.userName,
					password: connection?.password === '' ? encrypt(connection?.password) : '',
					hostname: connection?.hostname,
					name: connection?.name,
					port: connection?.port,
					protocol: connection?.protocol
				},
				name: name,
				sway: escape(sway.replace(/"/g, '\'')),
				timeslots: convertedTimeslots,
			}
		})
		data.labs = labs

		const createCourseDTO: CreateCourseDto = { ...data, teacher: { id: teacherId } }

		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			if (fileFilled) {
				const body = new FormData()
				body.append('course', JSON.stringify(createCourseDTO))
				body.append('file', file)
				courseService.createCourse(body, setErrorMessage, setSuccessMessage)
			}
		}
	}
	const [nrTimeSlots, setNrTimeslots] = useState([])

	const getTimeSlots = (labIndex) => {
		const timeslotsArray = []
		for (let index = 0; index < nrTimeSlots[labIndex]; index++) {
			timeslotsArray.push(<fieldset name={ `labs[${labIndex}].timeslots[${index}]` } key={ `labs[${labIndex}].timeslots[${index}]` }>
				{/* create object for each timeslot, append to timeslots before posting data */ }
				<Input
					label='Datum'
					name={ `labs[${labIndex}].timeslots[${index}].date` }
					minDate={ new Date().toISOString().split('T')[0] }
					type='date'
					register={ register }
					isRequired
				/>
				<Input
					label='Starttijd'
					type='time'
					name={ `labs[${labIndex}].timeslots[${index}].startTime` }
					register={ register }
					isRequired
				/>
				<Input
					label='Eindtijd'
					name={ `labs[${labIndex}].timeslots[${index}].endTime` }
					type='time'
					register={ register }
					isRequired
				/>
				<input type="checkbox" id="honey" className='hidden' />
				<hr />
			</fieldset>)

		}


		return timeslotsArray.map((item, idx) => {
			return <div key={ idx }>{ item }</div>
		})

	}
	const getLabos = () => {
		for (let index = 0; index < nrLabos; index++) {
			array.push(<fieldset name={ `labs[${index}]` } key={ `labs[${index}]` } >
				< Input
					label='Naam van het labo'
					name={ `labs[${index}].name`
					}
					placeholder='Computer networks - labo 1'
					register={ register }
					isRequired
				/>

				<h2>Connection settings</h2>
				<Input
					label='Naam van de connectie'
					name={ `labs[${index}].connection.name` }
					register={ register }
					placeholder='Router 1'
					isRequired={ false }
				/>
				<Select
					label='Protocol'
					name={ `labs[${index}].connection.protocol` }
					register={ register }
					isRequired
					defaultSelect={ Protocol.telnet }
					options={ Object.values(Protocol) }
				/>
				<Input
					label='Hostname'
					name={ `labs[${index}].connection.hostname` }
					register={ register }
					placeholder='192.160.8.2'
					isRequired
				/>
				<Input
					label='Poort'
					name={ `labs[${index}].connection.port` }
					register={ register }
					placeholder='8909'
					type='number'
					isRequired
				/>
				<Input
					label='Gebruikersnaam'
					name={ `labs[${index}].connection.userName` }
					register={ register }
					placeholder='user'
					isRequired={ false }
				/>
				<Input
					label='Wachtwoord'
					name={ `labs[${index}].connection.password` }
					register={ register }
					placeholder='*****'
					type='password'
					isRequired={ false }
				/>

				<h2>Instructies</h2>
				<Textarea
					label='Sway embed code'
					name={ `labs[${index}].sway` }
					register={ register }
					placeholder='<iframe ...> ... </iframe>'
				/>
				<h2>Tijdsloten toevoegen</h2>
				{ getTimeSlots(index) }
				<Button onClick={ (e) => { e.preventDefault(); updateNrTimeslots(index, nrTimeSlots[index] + 1) } } variant='secondary'>+ Tijdsslot toevoegen</Button>
				<input type="checkbox" id="honey" className='hidden' />
				<hr />
			</fieldset >)

		}
		return array.map((item, idx) => {
			return <div key={ idx }>{ item }</div>
		})
	}

	return (
		<Layout
			title="Voeg vak toe - Remote Lab Connection | Vives"
		>
			<div className={ styles.createCourse }>
				<BackgroundStripes />
				<Card>
					<PageTitle title="Vak toevoegen" />
					<form
						onSubmit={ handleSubmit(onSubmit) }
						noValidate
					>
						<Input
							label='Naam van het vak'
							name='name'
							register={ register }
							isRequired={ true }
							error={
								(errors.name && 'De naam van het vak invullen is verplicht.')
							}
						/>
						<DragAndDropInput
							label='Upload studenten die dit vak volgen  (.csv)'
							onChange={ (e: any) => {
								onFileChange(e, setFileName, setFileFilled, setFile)
							} }
							onKeyDown={ (e: any) => {
								e.key === 'Enter' || e.key === 'Spacebar'
									? document.getElementById('file')?.click()
									: null
							} }
							isFileFilled={ fileFilled }
							fileName={ fileName }
							accept={ ['csv'] }
							name='file'
							isRequired={ true }
						/>

						<h2>Labo&apos;s toevoegen</h2>
						{ getLabos() }
						<Button onClick={ (e) => { e.preventDefault(); setNrLabos(nrLabos + 1); setNrTimeslots(current => [...current, 0]) } } variant="secondary">+ Labo toevoegen</Button>

						<input type="checkbox" id="honey" className='hidden' />
						<Button isDisabled={ !isValid || !fileFilled }>Voeg toe</Button>
						<p>{ successMessage }</p>
						<p className='error'>{ errorMessage }</p>
					</form>
				</Card>
			</div>
		</Layout>
	)
}

export default CreateCoursePage

