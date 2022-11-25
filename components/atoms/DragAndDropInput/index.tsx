import React, { ChangeEventHandler } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { capitalizeString } from '../../../utils/capitalizeString'

import styles from './DragAndDropInput.module.scss'

export type DragAndDropInput = {
	label: string
	isRequired?: boolean
	onChange: ChangeEventHandler
	onKeyDown: any,
	onClick?: React.MouseEventHandler,
	isFileFilled: boolean
	fileName: string
	accept: string[]
	name: string
	id?: string
	error?: string
}

const DragAndDropInput = ({
	name,
	label,
	isRequired = false,
	onChange,
	isFileFilled,
	fileName,
	accept = [],
	onKeyDown,
	id,
	error = '',
	onClick = () => { return }

}: DragAndDropInput) => {
	return (
		<div onClick={ onClick }>
			<label className={ styles.uploadFile } tabIndex={ 0 } onKeyDown={ onKeyDown } data-testid='file'>
				<FileUploader handleChange={ onChange } name={ name } types={ accept } id={ id }>
					<span>
						{ capitalizeString(label as string) }
						{ isRequired === false && ' (optioneel)' }
					</span>
					<div className={ `
					${styles.uploadMessage}
					${isFileFilled ? styles.fileFilledTrue : styles.fileFilledFalse}
				`}>
						{ isFileFilled ? fileName : <span>Drag & Drop of <span className="underline">kies een bestand </span></span> }
					</div>
				</FileUploader>
				<span className={ styles.error }>{ error }</span>
			</label>
		</div>
	)
}

export default DragAndDropInput
