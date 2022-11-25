/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import {
	render, screen, fireEvent, waitFor
} from '@testing-library/react'

import CreateCoursePage from '../pages/createcourse'
import { Protocol } from '../libs/dtos/connection.dto'

const nameInputValue = [
	{
		label: 'Naam van het vak',
		correctTestvalue: 'Routers 101'
	},
]

const laboInputValues = [
	{
		label: 'Naam van het labo',
		correctTestvalue: 'Labo 1: Inleiding'
	}, {
		label: 'Naam van de connectie',
		correctTestvalue: 'Router 1'
	}, {
		label: 'Protocol',
		correctTestvalue: Object.values(Protocol)[0]
	}, {
		label: 'Hostname',
		correctTestvalue: '196.135.155.17'
	}, {
		label: 'Poort',
		correctTestvalue: 3202
	}, {
		label: 'Gebruikersnaam',
		correctTestvalue: 'admin'
	}, {
		label: 'Wachtwoord',
		correctTestvalue: 'wachtwoord'
	}, {
		label: 'Sway embed code',
		correctTestvalue: '<iframe></iframe>'
	}
]

describe('Form working', () => {
	it('Should render all form inputs', () => {
		render ( <CreateCoursePage />)
		nameInputValue.forEach((value, index) => {
			expect(screen.getByLabelText(value.label)).toBeInTheDocument()
		})
	})

	it('Should render an add lab button', () => {
		render (<CreateCoursePage />)
		const button = screen.getByRole('button', { name: '+ Labo toevoegen' })

		expect(button).toBeInTheDocument()
		expect(button).not.toBeDisabled()
	})

	it('Should render timeslot button on add lab', () => {
		render( <CreateCoursePage />)

		const button = screen.getByRole('button', { name: '+ Labo toevoegen' })
		fireEvent.click(button)

		const timeSlotButton = screen.getByRole('button', { name: '+ Tijdsslot toevoegen' })
		fireEvent.click(timeSlotButton)
	})
})
