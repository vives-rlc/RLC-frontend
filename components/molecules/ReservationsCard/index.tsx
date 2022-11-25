import Router from 'next/router'
import React, { Key } from 'react'
import { Role } from '../../../libs/dtos/user.dto'
import { fifteenMinutes } from '../../../libs/variables'

// Utils
import {
	diffToToday,
	formatDateTimeReservation,
} from '../../../utils/formatDate'

// Components
import Card from '../../atoms/Card'
import PageTitle from '../../atoms/PageTitle'
import Button from '../../atoms/SendButton/SendButton'

// Styles
import styles from './ReservationsCard.module.scss'

// Types
type Reservation = {
	id: string
	timeslot: {
		id: string
		startTime: string
		lab: {
			name: string
			course: {
				name: string
			}
		}
	}
}

export type ReservationsCardProps = {
	reservations: Reservation[]
	userRole: Role
}

const ReservationsCard = ({
	reservations,
	userRole,
}: ReservationsCardProps) => {
	return (
		<Card>
			<PageTitle
				title={
					userRole === Role.student
						? 'Mijn gereserveerde labo\'s'
						: userRole === Role.teacher
							? 'Gereserveerde slots'
							: ''
				}
			/>
			<div className={ styles.reservationCard }>
				{ reservations?.map((reservation: Reservation) => (
					<div key={ reservation.id }>
						<>
							<h4>{ formatDateTimeReservation(reservation.timeslot?.startTime) }</h4>
							<p className={ styles.course }>
								{ reservation.timeslot?.lab?.course?.name }
							</p>
							<p>
								{ reservation.timeslot?.lab?.name }
							</p>
							<Button
								isDisabled={ (diffToToday(reservation.timeslot?.startTime)) >= fifteenMinutes }
								onClick={ () => {
									Router.push({ pathname: '/labo', query: reservation.timeslot.id })
								} }>
								{ userRole === Role.student
									? 'Start labo'
									: userRole === Role.teacher
										? 'Meevolgen'
										: '' }
							</Button>
						</>
					</div>
				)) }
			</div>
		</Card>
	)
}

export default ReservationsCard
