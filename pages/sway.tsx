import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { unescape } from 'html-escaper'

import Loader from '../components/atoms/Loader'
import Layout from '../components/templates'

// Interfaces
import { ConnectionResultDto } from '../libs/dtos/connection.dto'

// Services
import { labService } from '../services/lab.service'

// Styles
import styles from '../styles/pages/Labo.module.scss'

const Sway = () => {
	const router = useRouter()
	const id = Object.keys(router.query)[0]

	const [result, setResult] = useState<ConnectionResultDto>(null)

	useEffect(() => {
		id && labService.getConnectionData(setResult, id)
	}, [id])

	return (
		<Layout title='RLC - Sway | Vives'>
			{
				result ? <div className={ `lg-flex ${styles.terminalContainer}` }>
					{ result !== undefined && < div dangerouslySetInnerHTML={ { __html: unescape(result.sway) } } /> }</div> : <Loader />
			}
		</Layout>
	)
}

export default Sway