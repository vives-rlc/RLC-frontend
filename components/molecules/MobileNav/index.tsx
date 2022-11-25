import React from 'react'

import { useRouter } from 'next/router'

import Menu from '../../atoms/icons/hamburger'
import CollapsibleNav from './CollapsibleNav'
import useComponentVisible from '../../../utils/useComponentVisible'

import styles from './MobileNav.module.scss'
import BackArrow from '../../atoms/icons/BackArrow'

export enum IconType {
	HomeIcon,
	Residential,
	KMO
}

export type NavItem = {
	name: string
	link: string
	icon?: IconType

}

export type NavProps = {
	navItems: NavItem[]
	currentTitle?: string
}

const MobileNav: React.FC<NavProps> = ({ navItems, currentTitle }) => {
	const router = useRouter()
	const {
		ref, isComponentVisible, setIsComponentVisible
	} = useComponentVisible(false)

	return (
		<nav
			className={`
				${styles.mobileNav}
				${(router.pathname === '' || router.pathname === '/') ? 'justify-end' : 'justify-between'}
			`}

		>
			{
				router.pathname !== '/' && router.pathname !== '' && <BackArrow onClick={() => router.back()} />
			}
			<div className={styles.top}>
				{currentTitle && (
					<h1>
						{currentTitle}
					</h1>
				)}
				<button onClick={() => setIsComponentVisible((prevState) => !prevState)} ref={ref}>
					{!isComponentVisible && <Menu className="stroke-current" />}
				</button>
			</div>
			{isComponentVisible &&
				<CollapsibleNav
					className='pt-3'
					links={navItems}
					navOpen={isComponentVisible}

				/>}
		</nav>
	)
}

export default MobileNav