import React, {
	useEffect, useState, ReactNode, createElement
} from 'react'
import Calendar from 'react-calendar'

// Utils
import { formatDateUS } from '../../../utils/formatDate'

// Styles
import styles from './Calendar.module.scss'

// Component
import NextArrow from '../../atoms/icons/NextArrow'
import BackArrow from '../../atoms/icons/BackArrow'
// import Availability from '../../atoms/Availability'

export type MyCalendarProps = {
	availableSlots?: Date[]
}

const MyCalendar = ({ availableSlots }: MyCalendarProps) => {
	const [day, setDay] = useState(new Date())
	const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(false)

	const onClickDay = (clickedDay: Date) => {
		setDay(clickedDay)
		setIsAvailabilityVisible(true)
	}


	availableSlots?.forEach((slot: Date) => {
		const formatedSlot = formatDateUS(slot)
		formatedSlot.style.background = '#D3D0BB'
		formatedSlot.style.borderRadius = '100%'
	})



	return (
		<>
			<Calendar
				value={ day }
				onClickDay={ onClickDay }
				className={ styles.calendar }
				nextLabel={ <NextArrow /> }
				next2Label=''
				prevLabel={ <BackArrow /> }
				prev2Label=''
				tileClassName={ styles.calendar__tile }
			/>
			{/* {
				isAvailabilityVisible && <Availability date={ new Date(day) } times={ ['11u - 12u', '14u - 15u', '15u - 16u'] } />
			} */}
		</>
	)
}
export default MyCalendar