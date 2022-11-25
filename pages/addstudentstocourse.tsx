import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

// Components
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import Card from '../components/atoms/Card'
import PageTitle from '../components/atoms/PageTitle'
import DragAndDropInput from '../components/atoms/DragAndDropInput'

// Templates
import Layout from '../components/templates'

// Styles
import styles from '../styles/pages/CreateCourse.module.scss'

// Utils
import { onFileChange } from '../utils/uploadFile'

// Services
import { courseService } from '../services/course.service'
import Button from '../components/atoms/SendButton/SendButton'
import Loader from '../components/atoms/Loader'


const AddStudentsToCoursePage = () => {
	const { handleSubmit, formState: { isValid } } = useForm()

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [course, setCourse] = useState(null)

	const id = Object.keys(Router.query)[0]

	useEffect(() => {
		id && courseService.getCourseById(setCourse, id)
	}, [id])

	const [fileName, setFileName] = useState('')
	const [fileFilled, setFileFilled] = useState(false)
	const [file, setFile] = useState(null)

	const onSubmit = () => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw')
		} else {
			if (fileFilled) {
				const body = new FormData()
				body.append('file', file)
				courseService.updateCourseStudents(course.id, body, setErrorMessage, setSuccessMessage)
			}
		}
	}

	return (<Layout title="Voeg studenten aan vak toe - Remote Lab Connection | Vives">
		<div className={ styles.createCourse }>
			<BackgroundStripes />
			{ course ? <Card>
				<PageTitle title={ `Studenten toevoegen aan <i>${course?.name}</i>` } />
				<form onSubmit={ handleSubmit(onSubmit) }>
					<DragAndDropInput label='Upload studenten die dit vak volgen  (.csv)'
						onChange={ (e: any) => {
							onFileChange(e, setFileName, setFileFilled, setFile)
						} }
						onKeyDown={ (e: any) => {
							e.key === 'Enter' || e.key === 'Spacebar'
								? document.getElementById('file')?.click()
								: null
						} }
						isFileFilled={ fileFilled }
						fileName={ fileName }
						accept={ ['csv'] }
						name='file'
						isRequired={ true }
					/>
					<input type="checkbox" id="honey" className='hidden' />
					<Button isDisabled={ !isValid || !fileFilled }>Voeg toe</Button>
					<p>{ successMessage }</p>
					<p className='error'>{ errorMessage }</p>
				</form>
			</Card> : <Loader /> }
		</div>
	</Layout>)
}

export default AddStudentsToCoursePage