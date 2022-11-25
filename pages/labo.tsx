import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { unescape } from 'html-escaper'

import { ConnectionResultDto } from '../libs/dtos/connection.dto'

// Services
import { labService } from '../services/lab.service'

// Styles
import styles from '../styles/pages/Labo.module.scss'

// Components
import Layout from '../components/templates'
import Terminal from '../components/atoms/Terminal'
import Button from '../components/atoms/SendButton/SendButton'

import Loader from '../components/atoms/Loader'
import Link from 'next/link'

const Labo = () => {
	const [result, setResult] = useState<ConnectionResultDto>(null)
	console.log({ result })
	const [isSaved, setIsSaved] = useState(false)
	const [oneScreen, setOneScreen] = useState(true)
	const router = useRouter()
	const id = Object.keys(router.query)[0]

	useEffect(() => {
		id && labService.getConnectionData(setResult, id)
	}, [id])

	useEffect(() => {
		const confirmationMessage = 'Wijzigingen die je hebt aangebracht, worden mogelijk niet opgeslagen..'
		const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
			(e || window.event).returnValue = confirmationMessage
			return confirmationMessage
		}

		if (!isSaved) {
			window.addEventListener('beforeunload', beforeUnloadHandler)
			window.addEventListener('popstate', beforeUnloadHandler)

		} else {
			window.removeEventListener('beforeunload', beforeUnloadHandler)
			window.removeEventListener('popstate', beforeUnloadHandler)
		}

		return () => {
			// necessary because when navigating away, listener will still be present on other route
			window.removeEventListener('beforeunload', beforeUnloadHandler)
			window.removeEventListener('popstate', beforeUnloadHandler)
		}
	}, [isSaved])

	return (
		<Layout title="RLC - Labo | Vives" isSaved={ isSaved }>
			<div className={ styles.buttonRow }>
				<Button onClick={ () => { setOneScreen(!oneScreen) } }>
					<Link href={ `/sway?${id}` }>
						<a target='_blank'>
							{ oneScreen ? 'Sway weergeven op apart scherm' : 'Sway en terminal weergeven op 1 scherm' }
						</a>
					</Link>
				</Button>
				<Button onClick={ () => { setIsSaved(true); labService.updateTimeslotIsCompleted(id); Router.push('/') } }>
					Beëindig labo
				</Button>
			</div>
			{
				result ? <div className={ `lg-flex ${styles.terminalContainer}` }>
					{ oneScreen && result !== undefined && < div dangerouslySetInnerHTML={ { __html: unescape(result.sway) } } /> }

					{ result?.connectionToken && (
						<Terminal
							destroyConnect={ isSaved }
							connection_string={ result?.connectionToken }
							term_width="50%"
						/>
					) }
				</div> : <Loader />
			}
		</Layout >
	)
}

export default Labo
