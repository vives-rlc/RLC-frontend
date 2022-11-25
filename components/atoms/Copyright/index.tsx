import * as React from 'react'

import styles from './Copyright.module.scss'

type CopyrightProps = {
	company?: string,
	year: string
}

const Copyright: React.FC<CopyrightProps> = ({ company, year }) => {
	return (
		<span
			className={ styles.copyright }
		>
			Ⓒ { company } { year }, door
			<a href="https://www.goomyx.com"> Goomyx</a>
		</span>)
}
export default Copyright