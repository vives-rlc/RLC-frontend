import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import VivesLogo from '../icons/Logo'

import styles from './HomeButton.module.scss'

export type HomeButtonProps = {
	alt?: string
	descr?: string
	isSaved?: boolean
}

function HomeButton({
	alt = 'Logo', descr, isSaved = false
}: HomeButtonProps) {
	const router = useRouter()

	return (
		<Link href="/">
			<a className={ (!isSaved && router.pathname === '/labo') ? styles.linkUnclickable : styles.link }>
				<VivesLogo alt={ alt } />
				{ descr && <p> { descr } </p> }
			</a>
		</Link>
	)
}

export default HomeButton
