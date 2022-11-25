/* eslint-disable @next/next/no-page-custom-font */
import React, {
	ReactNode, useEffect, useState
} from 'react'
import Head from 'next/head'

// Components
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'
import PageTitle from '../atoms/PageTitle'
import Notification from '../atoms/Notification'

// Services
import { userService } from '../../services/user.service'
import { reservationService } from '../../services/reservation.service'

// Functions
import { diffToToday } from '../../utils/formatDate'
import { fifteenMinutes } from '../../libs/variables'

// Styles
import styles from './Template.module.scss'
import { User } from '../../libs/dtos/user.dto'

// Types
import { Role } from '../../libs/dtos/user.dto'

export type Props = {
	children?: ReactNode
	title?: string
	pageTitle?: string
	subTitle?: ReactNode
	hasWaves?: boolean
	isSaved?: boolean
}

const Template = ({
	children,
	title = 'This is the default title',
	pageTitle,
	subTitle,
	isSaved = true
}: Props) => {
	const [user, setUser] = useState<User>()
	const [showNotif, setShowNotif] = useState(false)
	const [notifRes, setNotifRes] = useState<any>(null)
	const [futureReservations, setFutureReservations] = useState<any>(null)

	useEffect(() => {
		setUser(userService.getUserInfo())

		if (user?.role === Role.student) {
			userService.getStudentOrTeacherId().then((studentId) => {
				studentId && reservationService.getFutureReservations(studentId, setFutureReservations)
			})
				.then(() => {
					futureReservations && futureReservations?.forEach(res => {
						if (diffToToday(res.timeslot?.startTime) >= fifteenMinutes) {
							setNotifRes(res)
							setShowNotif(true)
						} else {
							setShowNotif(false)
						}
					})
				}).catch((e) => console.log(`Kan geen reservaties ophalen ${e}`))
		}
	}, [user?.role, futureReservations])

	return (
		<div>
			<Head>
				<title>{ title }</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#88a595" />
				<meta name="msapplication-TileColor" content="#88a595" />
				<meta name="theme-color" content="#88a595" />
			</Head>
			<div className={ styles.template } >
				<Header
					title='Remote lab connection'
					user={ user }
					subTitle={ subTitle }
					isSaved={ isSaved }
				/>
				{
					pageTitle && <PageTitle title={ pageTitle } />
				}
				<main >
					<div>{ children }</div>
				</main>
				<div className={ styles.contentWrap } />
				<Footer className='container' />
			</div>
			{ user?.role === Role.student && showNotif && <Notification
				reservation={ notifRes }
				isOpen={ true }
			/>
			}
		</div >
	)
}

export default Template
