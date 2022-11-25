import React from 'react'

import Tooltip from '../Tooltip'
import { capitalizeString } from '../../../utils/capitalizeString'

import styles from './DateTimeInput.module.scss'

export type DateTimeInputProps = {
	tooltipDescr?: string
	label?: string
	name?: string
	placeholder?: string
	register?: any
	isRequired?: boolean
	type: string
	className?: string
	error?: string
	max?: any
	min?: any
	step?: number
	isDisabled?: boolean
	defaultValue?: any
}

const DateTimeInput = ({
	tooltipDescr,
	label,
	name,
	placeholder,
	register,
	isRequired,
	type = 'date',
	className = '',
	error = '',
	max,
	min,
	step,
	isDisabled = false,
	defaultValue,
}: DateTimeInputProps) => {
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
					min={ min }
					max={ max }
					step={ step ? step : 'any' }
					disabled={ isDisabled }
					{ ...register(name ? name : label.toLowerCase(), {
						required: { value: isRequired },
					}) }
				/>
			</div>
			<span className={ styles.error }>{ error } </span>
		</label>
	)
}

export default DateTimeInput
