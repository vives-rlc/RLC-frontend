import React from 'react'
import { BsCheckSquare } from 'react-icons/bs'

import Underscore from '../icons/Underscore'
import Input from '../Input'
import Button from '../SendButton/SendButton'

import styles from './PageTitle.module.scss'

type PageTitleProps = {
	title?: string
	className?: string
	isInput?: boolean
	inputObject?: any
	register?: any
	onSubmit?: any
}

const PageTitle: React.FC<PageTitleProps> = ({
	className = '', title, isInput = false, inputObject, register, onSubmit
}) => {

	return (
		<h1
			className={ `${styles['page-title']} ${className}` }
		>
			<Underscore />
			<div>
				{
					isInput ? (
						onSubmit ?
							<form onSubmit={ onSubmit } className='flex justify-center items-center'>
								<Input name='name' register={ register } placeholder={ inputObject?.name } type='text' />
								<Button variant='secondary'><BsCheckSquare /></Button>
							</form> : <Input name='name' register={ register } placeholder={ inputObject?.name } type='text' defaultValue={ inputObject?.name } />) : title?.toUpperCase()
				}
			</div>
		</h1>
	)
}

export default PageTitle
