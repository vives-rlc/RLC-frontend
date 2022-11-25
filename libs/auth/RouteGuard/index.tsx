import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { userService } from '../../../services/user.service'
import { Role } from '../../dtos/user.dto'

export { RouteGuard }

function RouteGuard({ children }) {
	const router = useRouter()
	const [authorized, setAuthorized] = useState(false)

	useEffect(() => {
		authCheck(router.asPath)

		// on route change start: hide content
		const hideContent = () => setAuthorized(false)
		router.events.on('routeChangeStart', hideContent)

		// on route change complete: auth check
		router.events.on('routeChangeComplete', authCheck)

		// unsubscribe from events in useEffect
		return () => {
			router.events.off('routeChangeStart', hideContent)
			router.events.off('routeChangeComplete', authCheck)
		}
	}, [])

	function authCheck(url) {
		// redirect to loginif accessing private page, not logged in
		const publicPaths = ['/login', '/register', '/activate/[id]']
		const teacherPaths = ['/createcourse', '/createlab', '/addtimeslot', '/addstudentstocourse', '/edittmeslot']
		const path = url.split('?')[0]

		if (!userService.userValue && !publicPaths.includes(path)) {
			setAuthorized(false)
			const win: Window = window
			win.location = '/login'
		} else {
			if (teacherPaths.includes(path)) {
				const user = userService.getUserInfo()
				if (user?.role === Role.teacher) {
					setAuthorized(true)
				} else {
					setAuthorized(false)
					const win: Window = window
					win.location = '/'
				}

			} else {
				setAuthorized(true)
			}
		}
	}

	return (authorized && children)
}