import React, { useState } from 'react'
import { capitalizeString } from '../../../utils/capitalizeString'
import DownArrow from '../icons/DownArrow'
import Input from '../Input'

import Tooltip from '../Tooltip'

import styles from './Select.module.scss'
export interface Option {
	value: string | number
	label?: string
	key?: string | number
}
type SelectProps = {
	tooltipDescr?: string
	options: string[] | Option[],
	defaultSelect?: string,
	label: string,
	isRequired?: boolean,
	error?: string,
	register: any,
	name: string,
	hasInputOnSelect?: boolean
	descr?: string

}
const Select = ({
	name, options, defaultSelect = options[0] as string, label, tooltipDescr, isRequired = false, error = '', register, hasInputOnSelect = false, descr = ''
}: SelectProps) => {
	const [clicked, setClicked] = useState(false)
	return (
		<>
			<label className={ styles.label }>
				<div className={ styles.labelString }>
					{ capitalizeString(label as string) } { isRequired === false && ' (optioneel)' }
					{ tooltipDescr && <Tooltip className='ml-2'>{ tooltipDescr }</Tooltip> }
				</div>
				{ descr && <p>{ descr }</p> }
				<div className={ styles.select } onClick={ () => { setClicked(!clicked) } } onBlur={ () => setClicked(false) }>
					<select
						className={ error ? styles.error : styles.default }
						id={ name }
						onBlur={ () => setClicked(false) }
						onKeyPress={ (event) => { event.key === 'Enter' ? setClicked(true) : '' } }
						value={ defaultSelect }
						{ ...register(name ? name : label.toLowerCase(), {
							required: { value: isRequired }
						}) }
					>
						{
							options.map(option => option.value ?
								< option value={ option.value } key={ option.key ? option.key : option.value } >
									{ option.label ? option.label : option.value }
								</option> :
								<option value={ option } key={ option } >
									{ option }
								</option>) }
					</select>
					<DownArrow className={ `transition-transform
						${clicked ? 'rotate-180' : 'rotate-0'}
					`} />
				</div>
			</label>
			{
				hasInputOnSelect && (
					<Input
						register={ register }
						name={ `${name}_andere` }
						isRequired={ isRequired }
						label=""
						placeholder='andere namelijk ...'
					/>
				)
			}
		</>
	)
}

export default Select
