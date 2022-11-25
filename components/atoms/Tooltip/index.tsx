import React, { ReactNode } from 'react'

import Info from '../icons/Info'

import styles from './Tooltip.module.scss'

export type TooltipProps = {
	className?: string,
	children?: ReactNode
}

const Tooltip = ({ children, className }: TooltipProps) => {
	return (
		<div className={ styles.tooltip }>
			<Info className={ className } />
			<span className={ styles.tooltiptext }>{ children }</span>
		</div>
	)
}

export default Tooltip