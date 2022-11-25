import * as React from 'react'

type NextArrow = {
	onClick?: React.MouseEventHandler
}

function NextArrow({ onClick }: NextArrow) {
	return (
		<svg
			width="28"
			height="24"
			viewBox="0 0 28 24"
			onClick={ onClick }
			className='cursor-pointer'
		>
			<path d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM27.0607 13.0607C27.6464 12.4749 27.6464 11.5251 27.0607 10.9393L17.5147 1.3934C16.9289 0.807611 15.9792 0.807611 15.3934 1.3934C14.8076 1.97919 14.8076 2.92893 15.3934 3.51472L23.8787 12L15.3934 20.4853C14.8076 21.0711 14.8076 22.0208 15.3934 22.6066C15.9792 23.1924 16.9289 23.1924 17.5147 22.6066L27.0607 13.0607ZM2 13.5H26V10.5H2V13.5Z" fill="#1E1E1E" fillOpacity="0.8" />
		</svg>
	)
}

export default NextArrow
