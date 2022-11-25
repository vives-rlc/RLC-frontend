import React, { ReactNode } from 'react'

import Tooltip from '../Tooltip'
import { capitalizeString } from '../../../utils/capitalizeString'

import styles from './Input.module.scss'

export type InputProps = {
	unit?: ReactNode | string
	tooltipDescr?: string
	label?: string
	name?: string
	placeholder?: string
	register?: any
	isRequired?: boolean
	type?: string
	className?: string
	error?: string
	errorName?: string
	pattern?: RegExp
	max?: number
	min?: number
	minDate?: string
	step?: number
	isDisabled?: boolean
	defaultValue?: any
}

const Input = ({
	tooltipDescr,
	unit,
	label,
	name,
	placeholder,
	register,
	isRequired,
	type = 'text',
	className = '',
	error = '',
	errorName,
	pattern,
	max,
	min,
	minDate,
	step,
	isDisabled = false,
	defaultValue
}: InputProps) => {
	return (
		<label className={ `${className} ${styles.label}` }>
			{ label && <div className={ styles.field }>
				{ capitalizeString(label as string) } { isRequired === false && ' (optioneel)' }
				{ tooltipDescr && <Tooltip className='ml-2'>{ tooltipDescr }</Tooltip> }
			</div>
			}
			<div className={ styles.input }>
				<input
					defaultValue={ defaultValue }
					className={ error ? styles.hasError : styles.default }
					placeholder={ placeholder }
					type={ type }
					min={ minDate }
					step={ step ? step : 'any' }
					disabled={ isDisabled }
					{ ...register(name ? name : label.toLowerCase(), {
						valueAsNumber: type === 'number' ? true : false,
						required: { value: isRequired },

						pattern: {
							value: pattern,
							message: `Dit is geen geldig ${errorName ? errorName : label ? label.toLowerCase() : name}`,
						},

						max: {
							value: max,
							message: `${capitalizeString(errorName ? errorName : name ? name : label)} hoort kleiner te zijn dan ${max}`
						},
						min: {
							value: min,
							message: `${capitalizeString(errorName ? errorName : name ? name : label)} hoort groter te zijn dan ${min}`
						}
					}) }
				/>
				<p className={ type === 'number' ? styles.right : '' }>
					{ unit }
				</p>
			</div>
			<span className={ styles.error }>{ error } </span>
		</label>
	)
}

export default Input
