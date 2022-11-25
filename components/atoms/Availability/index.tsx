import React from 'react'

// Helpers
import { formatDateAvailability } from '../../../utils/formatDate'

// Components
import Button from '../SendButton/SendButton'

// Styles
import styles from './Availability.module.scss'

// Types
type AvailabilityProps = {
	date: Date,
	times: string[]
}
const Availability = ({ date, times }: AvailabilityProps) => {
	return (
		<div className={ styles.availability }>
			<p className={ styles.date }>{ formatDateAvailability(date) }</p>
			<ul>
				{
					times?.map((time, idx: React.Key) => (
						<li key={ idx }>
							<p>{ time } </p>
							<Button variant='secondary'>Reserveer</Button>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Availability