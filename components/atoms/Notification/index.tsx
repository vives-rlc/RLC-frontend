import Router from 'next/router'
import React, { useState } from 'react'
import { fifteenMinutes } from '../../../libs/variables'
import { diffToToday, minutesLeft } from '../../../utils/formatDate'

// Components
import Close from '../icons/close'
import Button from '../SendButton/SendButton'

// Styles
import styles from './Notification.module.scss'

// Types
export type NotificationProps = {
	reservation: {
		timeslot: {
			id,
			lab: {
				name
			},
			startTime
		}
	}
	isOpen: boolean
}

const Notification = ({
	reservation, isOpen
}: NotificationProps) => {
	const [open, setOpen] = useState(isOpen)
	return (
		<div className={ styles.notification } style={ open ? { display: 'flex' } : { display: 'none' } }>
			<Close onClick={ () => setOpen((prevOpen) => !prevOpen) } width={ 16 } height={ 16 } />
			<p>Over { minutesLeft(reservation.timeslot?.startTime) } minuten start het { reservation.timeslot.lab.name } labo</p>
			<Button
				variant='secondary'
				isDisabled={ (diffToToday(reservation.timeslot?.startTime)) <= fifteenMinutes }
				onClick={ () => {
					Router.push({ pathname: '/labo', query: reservation.timeslot.id })
				} }
			>Start labo</Button>
		</div>
	)
}

export default Notification
