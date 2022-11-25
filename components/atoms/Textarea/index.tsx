import React from 'react'
import styles from './Textarea.module.scss'
export type TextareaProps = {
	label?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any
	isRequired?: boolean
	placeholder?: any
	name?: string
	defaultValue?: string
}

const Textarea = ({
	label,
	register,
	isRequired,
	placeholder,
	name,
	defaultValue = ''
}: TextareaProps) => {
	return (
		<label className={ styles.textarea }>
			{ label }
			<textarea
				defaultValue={ defaultValue }
				placeholder={ placeholder }
				{ ...register(name ? name : label?.toLowerCase(), {
					isRequired,
				}) }
			/>
		</label>
	)
}

export default Textarea
