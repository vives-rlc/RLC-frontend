import React, { createRef, useEffect } from 'react'
import Guacamole from 'guacamole-common-js'
import GuacMouse from '../../../utils/GuacMouse'
import clipboard from '../../../utils/clipboard'

import { States } from '../../../interfaces'

export type TerminalProps = {
	connection_string: string,
	term_width: string,
	destroyConnect: boolean
}

const Terminal = ({
	connection_string, term_width, destroyConnect
}: TerminalProps) => {
	const dsp = createRef<HTMLDivElement>()
	const viewport = createRef<HTMLDivElement>()
	Guacamole.Mouse = GuacMouse.mouse
	let tunnel = null
	let connected = false
	let client = null
	let display = null
	let keyboard = null
	let mouse = null
	let connectionState = States.IDLE
	let errorMessage = ''
	const args = {}
	useEffect(() => {
		if (connection_string && !connected) {

			if (dsp.current === null) {
				return
			} else {
				connected = true
				connect()
			}
		}
	}, [])

	useEffect(() => {
		//check if user has reloaded the page or used back/forward arrow
		//in this case we need to destroy the connection fist because the component will not dismount on refresh or back/forward navigation

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (performance.getEntriesByType('navigation')[0].type === 'reload' || performance.getEntriesByType('navigation')[0].type === 'back_forward' || destroyConnect) {
			console.log('reload')
			destroyed()
			uninstallKeyboard()
			connected = true
			connect()
		}
		const win: Window = window
		win.onpopstate = () => {
			console.log('going back')
			destroyed()
			uninstallKeyboard()
		}
		return () => {
			// componentwillunmount in functional component.
			// Anything in here is fired on component unmount.
			console.log('unmounting')
			destroyed()
		}
	}, [destroyConnect])


	const send = cmd => {
		if (!client) { return }
		for (const c of cmd.data) {
			client.sendKeyEvent(1, c.charCodeAt(0))
		}
	}

	const copy = cmd => {
		if (!client) { return }
		clipboard.cache = {
			type: 'text/plain',
			data: cmd.data
		}
		clipboard.setRemoteClipboard(client)
	}

	const handleMouseState = mouseState => {
		const scaledMouseState = Object.assign({}, mouseState, {
			x: mouseState.x / display.getScale(),
			y: mouseState.y / display.getScale()
		})
		client.sendMouseState(scaledMouseState)
	}

	const resize = () => {
		if (!viewport.current || !viewport.current.offsetWidth) { return }
		const pixelDensity = window.devicePixelRatio || 1
		const width = viewport.current.clientWidth * pixelDensity
		const height = viewport.current.clientHeight * pixelDensity

		client.sendSize(width, height)
		setTimeout(() => {
			const scale = Math.min(
				viewport.current.clientWidth / Math.max(display.getWidth(), 1),
				viewport.current.clientHeight / Math.max(display.getHeight(), 1)
			)
			display.scale(scale)
		}, 1000)
	}

	const connect = () => {
		console.log('Connect')
		const host = process.env.BACKEND_URL
		const connectPort = process.env.RESERVATION_SERVER_PORT
		tunnel = new Guacamole.WebSocketTunnel(`ws://${host}:${connectPort}/`)
		client = new Guacamole.Client(tunnel)

		client.connect(`token=${connection_string}`)

		clipboard.install(client)
		//dit werkt niet
		tunnel.onerror = status => {
			console.error(`Tunnel failed ${JSON.stringify(status)}`)
			connectionState = States.TUNNEL_ERROR
		}

		tunnel.onstatechange = state => {

			switch (state) {
			case Guacamole.Tunnel.State.CONNECTING:
				connectionState = States.CONNECTING
				break
			case Guacamole.Tunnel.State.OPEN:
				connectionState = States.CONNECTED
				break
			case Guacamole.Tunnel.State.UNSTABLE:
				break
			case Guacamole.Tunnel.State.CLOSED:
				connectionState = States.DISCONNECTED
				break
			}
		}

		client.onstatechange = clientState => {
			switch (clientState) {
			case 0:
				connectionState = States.IDLE
				break
			case 1:
				break
			case 2:
				connectionState = States.WAITING
				break
			case 3:
				connectionState = States.CONNECTED
				client.sendKeyEvent(1, 65293)
				client.sendKeyEvent(0, 65293)
				window.addEventListener('resize', resize)
				break
				//clipboard.setRemoteClipboard(client)
			case 4:
			case 5:
				break
			}
		}
		//dit werkt niet --> omdat we met guacamole lite werken??
		client.onerror = error => {
			client.disconnect()
			console.error(`Client error ${JSON.stringify(error)}`)
			errorMessage = error.message
			connectionState = States.CLIENT_ERROR
		}

		// client.onsync = () => { }

		// Test for argument mutability whenever an argument value is received
		client.onargv = (stream, mimetype, name) => {
			if (mimetype !== 'text/plain') { return }
			const reader = new Guacamole.StringReader(stream)
			// Assemble received data into a single string
			let value = ''
			reader.ontext = text => {
				value += text
			}
			// Test mutability once stream is finished, storing the current value for the argument only if it is mutable
			reader.onend = () => {
				const str = client.createArgumentValueStream('text/plain', name)
				str.onack = status => {
					if (status.isError()) {
						// ignore reject
						return
					}
					args[name] = value
				}
			}
		}

		//client.onclipboard = clipboard.on
		display = client.getDisplay()

		dsp.current.appendChild(display.getElement())


		mouse = new Guacamole.Mouse(dsp.current)
		mouse.onmouseout = () => {
			if (!display) { return display.showCursor(false) }
		}

		dsp.current.onclick = () => dsp.current.focus()
		dsp.current.onfocus = () => dsp.current.className = 'focus'
		dsp.current.onblur = () => dsp?.current ? dsp.current.className = '' : ''

		keyboard = new Guacamole.Keyboard(dsp.current)
		installKeyboard()
		mouse.onmousedown = mouse.onmouseup = mouse.onmousemove = handleMouseState
		setTimeout(() => {
			connected && resize()
			dsp.current?.focus()
		}, 1000)

		client.onpipe = function pipeReceived(stream, mimetype, name) {
			// For sake of this proof of concept, only handle text streams
			if (mimetype !== 'text/plain') {
				stream.sendAck('Only text streams are supported in this proof of concept.', Guacamole.Status.Code.UNSUPPORTED)
				return
			}

			// Log start of stream
			const reader = new Guacamole.StringReader(stream)
			console.log('pipe: %s: stream begins', name)

			// Log each received blob of text
			reader.ontext = function textReceived(text) {
				console.log('pipe: %s: "%s"', name, text)
			}
			// Log end of stream
			reader.onend = function streamEnded() {
				console.log('pipe: %s: stream ends', name)
			}
		}
	}

	const destroyed = () => {
		console.log('disconnecting')
		const cmd_reload = {
			'data': 'reload'
		}
		const cmd_no = {
			'data': 'no'
		}
		send(cmd_reload)
		client.sendKeyEvent(1, 65293) // enter prompt
		send(cmd_no)
		client.sendKeyEvent(1, 65293) // enter prompt
		connected = false
		client.disconnect()
	}

	const reset_devices = () => {
		const cmd_reload = {
			'data': 'reload'
		}
		const cmd_no = {
			'data': 'no'
		}
		send(cmd_reload)
		client.sendKeyEvent(1, 65293) // enter prompt
		send(cmd_no)
		client.sendKeyEvent(1, 65293) // enter prompt
	}

	const installKeyboard = () => {
		keyboard.onkeydown = keysym => {
			client.sendKeyEvent(1, keysym)
		}
		keyboard.onkeyup = keysym => {
			client.sendKeyEvent(0, keysym)
		}
	}

	const uninstallKeyboard = () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		keyboard.onkeydown = keyboard.onkeyup = () => { }
	}

	return (
		<div
			className='viewport m-auto'
			style={ { 'height': '480px', 'width': term_width } }
			ref={ viewport }
			onMouseEnter={ resize }
		>
			<div
				onContextMenu={ (e) => {
					e.stopPropagation()
					if (e.preventDefault) {
						e.preventDefault()
					}
				} }
				ref={ dsp }
				className='display'
				tabIndex={ 0 }>
				{/* //	{display?.getElement()} */ }
			</div>
		</div>
	)
}

export default Terminal
