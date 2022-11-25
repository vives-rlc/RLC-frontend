import React, { useEffect, useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'

// Components
import Button from '../components/atoms/SendButton/SendButton'
import Layout from '../components/templates'
import { TimeslotsTable } from '../components/molecules/TimeslotsTable'

// Styles
import styles from '../styles/pages/AllTimeslots.module.scss'

// Services
import { userService } from '../services/user.service'
import { timeslotService } from '../services/timeslot.service'

const AllTimeSlots = () => {
	const [allTimeslots, setAllTimeslots] = useState([])
	const createTimeslotClicked = () => {
		const win: Window = window
		win.location = '/addtimeslot'
	}

	useEffect(() => {
		userService.getStudentOrTeacherId().then((teacherId) =>
			teacherId && timeslotService.getAllTimeslots(teacherId, setAllTimeslots))
	}, [])
	return (
		<Layout title='Alle tijdsloten - Remote Lab Connection | Vives'>
			<div className={ styles.button }>
				<Button onClick={ createTimeslotClicked }><MdOutlineAdd /> Tijdslot toevoegen</Button>
			</div>
			{ allTimeslots.length !== 0 ? <TimeslotsTable allTimeslots={ allTimeslots } /> : <p>Geen tijdsloten gevonden.</p> }
		</Layout>)
}

export default AllTimeSlots