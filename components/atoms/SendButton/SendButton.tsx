import React, { ReactNode } from 'react'

import styles from './SendButton.module.scss'

export type PictureButtonProps = {
	isDisabled?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	children?: ReactNode
	variant?: 'primary' | 'secondary'
	type?: 'submit' | 'reset' | 'button'
}

const Button = ({
	children,
	isDisabled,
	onClick,
	variant = 'primary',
	type = 'submit'
}: PictureButtonProps) => {
	return (
		<button
			className={ ` 
				${styles.button}
				${variant === 'primary' ? styles.primary : styles.secondary}
				${isDisabled ? 'opacity-40' : 'opacity-90'}` }
			disabled={ isDisabled }
			type={ type }
			onClick={ onClick }
		>
			{ children }
		</button>
	)
}

export default Button
