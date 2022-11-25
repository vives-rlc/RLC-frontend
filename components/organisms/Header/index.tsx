import React, { ReactNode } from 'react'
import { Role, User } from '../../../libs/dtos/user.dto'

import HomeButton from '../../atoms/HomeButton'
import Profile from '../../atoms/Profile'

import styles from './Header.module.scss'


type HeaderProps = {
	title?: string
	className?: string
	user?: User
	subTitle?: ReactNode
	isSaved?: boolean
}

const Header: React.FC<HeaderProps> = ({
	title, className = '', user, subTitle, isSaved = true
}) => {
	return (
		<>
			<header className={ `
				container
				${styles.header}
				${className}
			`}>
				<div className={ styles.title }>
					{ title }
					{ user && <p>{ user.role === Role.teacher ? 'Docent' : user.role === Role.student ? 'Student' : '' }</p> }
				</div>
				<HomeButton isSaved={ isSaved } />
			</header>
			{
				user &&
				<Profile
					title={ subTitle }
					name={ `${user.firstName} ${user.lastName}` }
				/>
			}

		</>
	)
}

export default Header
