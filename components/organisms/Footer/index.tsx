import React from 'react'
import Copyright from '../../atoms/Copyright'

import styles from './Footer.module.scss'

type FooterProps = {
	className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
	return (
		<footer className={ `${styles.footer} ${className}` }>
			<picture>
				<source srcSet='/rrf_combilogo_bleke_achtergrond_gefinancierd_eu.svg' type="image/svg" />
				<img src='/rrf_combilogo_bleke_achtergrond_gefinancierd_eu.svg' width={ 200 } />
			</picture>

			<Copyright year="2022" />
		</footer>
	)
}

export default Footer
