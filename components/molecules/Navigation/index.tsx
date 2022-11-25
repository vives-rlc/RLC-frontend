import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Navigation.module.scss'

export type navItem = {
  link: string
  name: string
}

export type navDataProps = {
  location: string
  navItems: navItem[]
}

const Nav = ({ location, navItems }: navDataProps) => {
	const router = useRouter()
	return (
		<nav className={location === 'header' ? '' : 'mb-8'}>
			<ul
				className={`${styles.nav} ${
					location === 'header' ? '' : styles['no-header']
				} `}
			>
				{navItems.map(({ link, name }: navItem, idx: React.Key | null | undefined) => (
					<li
						className={`
							${location === 'header' && router.pathname === link ? styles.active : ''}
							${location === 'header' && router.pathname !== link ? styles.link : ''}
							${location === 'footer' ? styles.footer : ''}
						`}
						key={idx}
						onClick={() => {
							router.replace(link)
						}}
					>
						<Link href={link}>
							<a
								className={
									location === 'header'
										? styles.header
										: ' text-xs'
								}
							>
								{location === 'header' ? name.toUpperCase() : name}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Nav
