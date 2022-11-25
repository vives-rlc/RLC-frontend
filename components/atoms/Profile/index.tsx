import React, {
	MouseEventHandler, ReactNode, useState
} from 'react'
import { capitalizeString } from '../../../utils/capitalizeString'

// Components
import Person from '../icons/Person'
import styles from './Profile.module.scss'

// Types
type Setting = {
	setting: string,
	onClick?: MouseEventHandler
}
export type ProfileProps = {
	title?: ReactNode,
	name: string,
	profileSettings?: Setting[]
}

const Profile = ({
	title, name, profileSettings = [{ setting: 'Uitloggen' }]
}: ProfileProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const settingClicked = (setting) => {
		if (setting.toLowerCase() === 'uitloggen') {
			localStorage.removeItem('userToken')
			const win: Window = window
			win.location = '/login'
		}
	}
	return (
		<div className={ styles.profile }>
			<div className={ styles.subTitle }>{ title }</div>
			<div className={ styles.person } onClick={ () => setIsOpen((prevOpen) => !prevOpen) }>
				<Person />
				<p>{ capitalizeString(name) }</p>
			</div>
			<ul style={ isOpen ? { 'visibility': 'visible' } : { 'visibility': 'hidden' } }>
				{ profileSettings.map((
					{
						setting
					}: Setting,
					idx: React.Key | null | undefined
				) => (
					<li key={ idx } onClick={ () => settingClicked(setting) }>
						{ setting }
					</li>
				)) }
			</ul>
		</div>
	)
}

export default Profile
