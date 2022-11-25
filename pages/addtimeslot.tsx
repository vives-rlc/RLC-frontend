import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

// Templates
import Layout from '../components/templates'

// Components
import Card from '../components/atoms/Card'
import PageTitle from '../components/atoms/PageTitle'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Select from '../components/atoms/Select'
import Button from '../components/atoms/SendButton/SendButton'

// Styles
import styles from '../styles/pages/AddTimeSlot.module.scss'

// Services
import { labService } from '../services/lab.service'
import DateTimeInput from '../components/atoms/DateTimeInput'

const AddTimeSlotPage = () => {

	const {
		register, watch, handleSubmit, formState:
		{
			errors
		}
	} = useForm({ mode: 'onTouched' })

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [labo, setLabo] = useState(null)
	const [labs, setLabs] = useState([])

	const date = watch('date')
	const endTime = watch('endTime')
	const startTime = watch('startTime')

	const id = Object.keys(Router.query)[0]

	useEffect(() => {
		labService.getLabs(setLabs)
		id && labService.getLaboById(setLabo, id)
	}, [id])

	const onSubmit = (data) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			labService.addTimeslotsToLab(id ? labo.id : data.name, data, setErrorMessage, setSuccessMessage)
		}
	}
	return (
		<Layout
			title="Voeg tijdslot toe - Remote Lab Connection | Vives"
		>
			<div className={ styles.addTimeSlot }>
				<BackgroundStripes />
				<Card>
					<PageTitle title="Tijdslot toevoegen" />
					<form onSubmit={ handleSubmit(onSubmit) } noValidate>
						<DateTimeInput
							label='datum'
							name='date'
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
							register={ register }
							isRequired
							error={ errors.startTime && 'De starttijd invullen is verplicht.' }
						/>
						<DateTimeInput
							label='eindtijd'
							name='endTime'
							type='time'
							register={ register }
							isRequired
							error={ errors.endTime && 'De eindtijd invullen is verplicht.' ||
								startTime && endTime && startTime > endTime && 'De eindtijd moet na de starttijd plaatsvinden.'
							}
						/>
						{ labo ? <h2><i>Labo:</i> { labo.name }</h2> : <Select
							label='name'
							options={ labs.map((lab) => {
								return {
									label: lab.name, value: lab.id
								}
							}) }
							name='name'
							register={ register }
							isRequired
							error={
								errors.name && 'De naam van een labo invullen, is verplicht.'
							}
						/>

						}
						<input type="checkbox" id="honey" className='hidden' />
						<Button type='submit'>Voeg toe</Button>
						<p>{ successMessage }</p>
						<p className='error'>{ errorMessage }</p>
					</form>
				</Card>

			</div>
		</Layout>
	)
}

export default AddTimeSlotPage
