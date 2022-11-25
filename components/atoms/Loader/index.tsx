import React from 'react'

import styles from './Loader.module.scss'

type LoaderProps = {
	numberOfDots?: number
}
const Loader = ({ numberOfDots = 4 }: LoaderProps) => {
	const dots = (number: number) => {
		const arr = []
		for (let i = 0; i < number; i++) {
			arr.push(<span className={ styles.span } key={ i } />)
		}
		return arr
	}
	return (
		<div className={ styles.loader }>
			{ dots(numberOfDots) }
		</div>
	)
}

export default Loader