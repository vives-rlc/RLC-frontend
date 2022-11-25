import React from 'react'

import Layout from '../components/templates'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import PageTitle from '../components/atoms/PageTitle'
import Button from '../components/atoms/SendButton/SendButton'

// Styles
import styles from '../styles/pages/404.module.scss'
import { useRouter } from 'next/router'
import Card from '../components/atoms/Card'

export default function Custom404() {
	const router = useRouter()
	return (<Layout title="404 | Vives">
		<div className={ styles.fourOFourPage }>
			<BackgroundStripes className={ styles.bgStripes } />
			<Card>
				<div className={ styles.number }>
					<span>4</span>
					<span>0</span>
					<span className={ styles.last }>4</span>
				</div>
				<PageTitle title="oeps dat ging niet helemaal goed" />
				<Button onClick={ () => router.push('/') }>← Terug naar begin</Button>
			</Card>
		</div>
	</Layout>)
}