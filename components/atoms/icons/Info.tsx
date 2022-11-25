import * as React from 'react'

function Info(props) {
	return (
		<svg className='cursor-pointer' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="10" cy="10" r="10" fill="black"/>
			<path d="M10.72 16.064c-.565 0-.997-.165-1.296-.496-.299-.341-.448-.779-.448-1.312V8.032H10.8v6.064c0 .245.037.41.112.496.075.085.187.128.336.128h.128a.594.594 0 0 0 .144-.016c.043 0 .09-.005.144-.016l.192 1.152c-.075.043-.17.08-.288.112a2.154 2.154 0 0 1-.368.08 3.194 3.194 0 0 1-.48.032ZM9.92 4.48c.341 0 .603.101.784.304.181.203.272.464.272.784s-.096.587-.288.8c-.181.213-.453.32-.816.32-.341 0-.608-.101-.8-.304a1.147 1.147 0 0 1-.272-.768c0-.33.09-.603.272-.816.192-.213.475-.32.848-.32Z" fill="white"/>
		</svg>
	)
}

export default Info