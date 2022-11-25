import React, {
	MutableRefObject, useRef
} from 'react'
import { FiSearch } from 'react-icons/fi'

// Components
import Input from '../Input'

interface SearchProps {
	searchTerm?: string
	register: any
}

export default function Search({
	searchTerm = '', register
}: SearchProps) {
	const searchRef = useRef(null) as MutableRefObject<HTMLInputElement | null>

	return (
		<div style={ { 'marginTop': '16px' } } ref={ searchRef }>
			<Input type="text" placeholder={ `Zoek ${searchTerm}` } name='query' register={ register } unit={ <FiSearch /> } />
		</div>
	)
}