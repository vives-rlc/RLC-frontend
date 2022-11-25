import * as React from 'react'

function Person(props: any) {
	return (
		<svg
			width="28"
			height="32"
			viewBox="0 0 28 32"
			{ ...props }
		>
			<path
				d="M24.4103 9.76842C24.4103 15.1634 19.7494 19.5368 14 19.5368C8.25057 19.5368 3.58974 15.1634 3.58974 9.76842C3.58974 4.37347 8.25057 0 14 0C19.7494 0 24.4103 4.37347 24.4103 9.76842Z"
				fill="#1E1E1E"
			/>
			<path
				d="M28 31.8764C28 31.9176 27.9996 31.9588 27.9989 32H23.8433C22.1662 28.626 18.3899 26.2737 14 26.2737C9.6101 26.2737 5.83377 28.626 4.15669 32H0.00113932C0.000394381 31.9588 0 31.9176 0 31.8764C0 26.5497 6.26803 22.2316 14 22.2316C21.732 22.2316 28 26.5497 28 31.8764Z"
				fill="#1E1E1E"
			/>
		</svg>
	)
}

export default Person