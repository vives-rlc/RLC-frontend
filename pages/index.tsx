import React, {
	useEffect, useState
} from 'react'
import { MdOutlineAdd } from 'react-icons/md'

// Components
import Layout from '../components/templates'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Card from '../components/atoms/Card'
import Button from '../components/atoms/SendButton/SendButton'
import PageTitle from '../components/atoms/PageTitle'
import ReservationsCard from '../components/molecules/ReservationsCard'

// Styles
import styles from '../styles/pages/Index.module.scss'

import { userService, userSubject } from '../services/user.service'
import { Role, User } from '../libs/dtos/user.dto'
import { courseService } from '../services/course.service'
import Router from 'next/router'
import { reservationService } from '../services/reservation.service'
import Loader from '../components/atoms/Loader'

const createCourseClicked = () => {
	const win: Window = window
	win.location = '/createcourse'
}

const IndexPage = () => {
	const [user, setUser] = useState<User>(null)
	const [courses, setCourses] = useState([])
	const [futureReservation, setFutureReservation] = useState<any>()

	useEffect(() => {
		setUser(userService.getUserInfo())

		if (user?.role === Role.student) {
			userService.getStudentOrTeacherId().then((studentId) => {
				studentId && reservationService.getFutureReservations(studentId, setFutureReservation)
			}).catch((e) => console.log(`Kan geen reservaties ophalen ${e}`))
		}

		userSubject.value && courseService.getCourses(setCourses)
	}, [user?.role, userSubject.value, futureReservation])

	const goToCourse = (item) => {
		Router.push({ pathname: `/course/${item?.id}` })
	}

	return (
		<>
			<Layout title="Remote Lab Connection | Vives" subTitle={ user?.role === Role.teacher ? 'Vakken' : '' }>
				<div className={ styles.dashboard }>
					<BackgroundStripes className={ styles.backgroundStripes } />
					{ user ? <>
						{
							user?.role === Role.teacher && (
								<div className={ styles.teacherCard }>
									<Card>
										<div className={ styles.buttonRow }>
											<Button onClick={ () => Router.push('/alltimeslots') }>Alle tijdsloten</Button>
											<Button onClick={ createCourseClicked }>
												<MdOutlineAdd />
												Vak toevoegen
											</Button>
										</div>
										<ul>
											{
												courses.length !== 0 ? courses.map((item) => <li key={ item?.id }><Button variant='secondary' onClick={ () => goToCourse(item) }>{ item?.name }</Button></li>) : <p>Je hebt nog geen vakken toegevoegd.</p>
											}
										</ul>
									</Card>
								</div>
							)
						}
						{
							user?.role === Role.student && (
								<div className={ styles.studentCard }>
									<Card>
										<PageTitle title='Mijn vakken' />
										<ul className={ styles.student }>
											{
												courses.length !== 0 ? courses.map((item) => <li key={ item?.id }><Button variant='secondary' onClick={ () => goToCourse(item) }>{ item?.name }</Button></li>) : <p>Er zijn nog geen vakken voor jou toegevoegd.</p>
											}
										</ul>
									</Card>
									{ futureReservation && <ReservationsCard
										userRole={ Role.student }
										reservations={ futureReservation }
									/> }
								</div>
							)
						}
					</>
						: <Loader />
					}
				</div>
			</Layout>
		</>
	)
}

export default IndexPage
