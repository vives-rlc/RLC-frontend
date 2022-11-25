import React from 'react'
import { AppProps } from 'next/app'

// Styles
import '../styles/index.scss'
import '../styles/calendar.scss'

// Templates
import { RouteGuard } from '../libs/auth/RouteGuard'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<RouteGuard>
				<Component { ...pageProps } />
			</RouteGuard>
		</>
	)
}

export default MyApp
