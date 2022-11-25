import * as React from 'react'

function Close(props: any) {
	return (
		<svg width="20" height="20" viewBox="0 0 17 17" fill="none" {...props}>
			<path
				stroke="rgba(30, 30, 30, 0.8)"
				strokeWidth="2"
				strokeLinecap="round"
				d="m1.414 2 12.728 12.728M2 14.586 14.728 1.858"
			/>
		</svg>
	)
}

export default Close
