import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

// Templates
import Layout from '../components/templates'

// Components
import Card from '../components/atoms/Card'
import PageTitle from '../components/atoms/PageTitle'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Button from '../components/atoms/SendButton/SendButton'

// Styles
import styles from '../styles/pages/AddTimeSlot.module.scss'

// Services
import { timeslotService } from '../services/timeslot.service'
import { formatDateTimeToInputDate, formatDateTimeToInputTime } from '../utils/formatDate'
import { EditTimeslotDto } from '../libs/dtos/timeslot.dto'
import DateTimeInput from '../components/atoms/DateTimeInput'

const EditTimeSlotPage = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [timeslot, setTimeslot] = useState(null)

	const {
		register, watch, handleSubmit, formState:
		{
			errors, isValid, isDirty
		}
	} = useForm({
		mode: 'onTouched'
	})

	const date = watch('date')
	const endTime = watch('endTime')
	const startTime = watch('startTime')

	const id = Object.keys(Router.query)[0]

	useEffect(() => {
		id && timeslotService.getTimeslotById(id, setTimeslot)
	}, [id])

	const onSubmit = (data) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			const editTimeslot: EditTimeslotDto = {
				startTime: new Date(`${data.date}T${data.startTime}:00`),
				endTime: new Date(`${data.date}T${data.endTime}:00`)
			}
			timeslotService.updateTimeslot(id, editTimeslot, setErrorMessage, setSuccessMessage)
		}
	}

	return (
		<Layout
			title="Wijzig tijdslot - Remote Lab Connection | Vives"
		>
			<div className={ styles.addTimeSlot }>
				<BackgroundStripes />
				<Card>
					<PageTitle title="Tijdslot wijzigen" />
					<form onSubmit={ handleSubmit(onSubmit) } noValidate>
						{
							timeslot !== null &&
							<>
								<DateTimeInput
									name='date'
									label='datum'
									defaultValue={ formatDateTimeToInputDate(timeslot.startTime) }
									type='date'
									min={ new Date().toISOString().split('T')[0] }
									register={ register }
									isRequired
									error={
										(errors.date && 'De datum invullen is verplicht.') ||
										(date && (new Date(date).getDate() < new Date().getDate() && 'De datum voor je reservatie moet in de toekomst plaatsvinden.'))
									}
								/>
								<DateTimeInput
									label='starttijd'
									name='startTime'
									type='time'
									defaultValue={ formatDateTimeToInputTime(timeslot.startTime) }
									register={ register }
									isRequired
									error={ errors.startTime && 'De starttijd invullen is verplicht.' }
								/>
								<DateTimeInput
									defaultValue={ formatDateTimeToInputTime(timeslot.endTime) }
									label='eindtijd'
									name='endTime'
									type='time'
									register={ register }
									isRequired
									error={ errors.endTime && 'De eindtijd invullen is verplicht.' ||
										startTime && endTime && startTime > endTime && 'De eindtijd moet na de starttijd plaatsvinden.'
									}
								/>
							</>
						}

						<input type="checkbox" id="honey" className='hidden' />
						<Button type='submit' isDisabled={ !isValid && !isDirty }>Wijzig</Button>
						<p>{ successMessage }</p>
						<p className='error'>{ errorMessage }</p>
					</form>
				</Card>
			</div>
		</Layout>
	)
}

export default EditTimeSlotPage
