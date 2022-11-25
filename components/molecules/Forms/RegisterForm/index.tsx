import Link from 'next/link'
import React, {
	useState, useEffect
} from 'react'
import { useForm } from 'react-hook-form'

// Services
import { userService } from '../../../../services/user.service'

// Components
import Input from '../../../atoms/Input'
import PageTitle from '../../../atoms/PageTitle'
import Button from '../../../atoms/SendButton/SendButton'

// Styles
import styles from './RegisterForm.module.scss'

// Types
type FormData = {
	firstName: string,
	lastName: string,
	email: string,
	number: string,
	password: string
}

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: {
			errors, isValid, isDirty
		},
	} = useForm({ mode: 'onTouched' })

	useEffect(() => {
		// redirect to home, if already logged in
		if (userService.userValue) {
			const win: Window = window
			win.location = '/'
		}
	}, [])

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const confirmation = watch('confirmation')
	const password = watch('password')

	const onSubmit = (data: FormData) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			userService.register(data, setErrorMessage, setSuccessMessage)
		}
	}

	return (
		<>
			<form
				className={ styles.registerForm }
				onSubmit={ handleSubmit(onSubmit) }
				noValidate
			>
				<div className={ styles.form }>
					<PageTitle title="registreren als docent" />
					<div>
						<Input
							className="input-ml-2"
							label="Voornaam"
							placeholder="Jane"
							register={ register }
							name="firstName"
							isRequired
							error={ errors.firstName && 'Je voornaam invullen is verplicht.' }
						/>
						<Input
							label="Familienaam"
							placeholder="Doe"
							name="lastName"
							register={ register }
							isRequired
							className="input-ml-2"
							error={ errors.lastName && 'Je familienaam invullen is verplicht.' }
						/>

						<Input
							type="email"
							label="E-mailadres"
							placeholder="janedoe@vives.com"
							register={ register }
							name="email"
							isRequired
							className="input-ml-2"
							pattern={ /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
							error={
								errors.email?.message?.toString() ||
								(errors.email && 'Je-mailadres invullen is verplicht.')
							}
						/>
						<Input
							label="Gebruikersnummer"
							name='number'
							placeholder="r0000000"
							register={ register }
							className="input-ml-2"
							isRequired
							pattern={ /[u][0-9]{7}/i }
							error={
								errors.number?.message?.toString() ||
								errors.number &&
								'Je gebruikersnummer invullen is verplicht.'
							}
						/>
						<Input
							type="password"
							name='password'
							label="wachtwoord"
							placeholder="******"
							className="input-ml-2"
							isRequired
							register={ register }
							error={
								errors.password && 'Een wachtwoord invullen, is verplicht.'
							}
						/>
						<Input
							type="password"
							name='confirmation'
							label="bevestig wachtwoord"
							placeholder="******"
							isRequired
							className="input-ml-2"
							register={ register }
							error={
								errors.password && 'Een wachtwoord invullen, is verplicht.' ||
								(((confirmation !== '' && password !== '') && confirmation !== password) && 'Wachtwoorden komen niet overeen.')
							}
						/>
						<input type="checkbox" id="honey" className="hidden" />
						<Button isDisabled={ !isDirty || !isValid }>Registreer</Button>

						<p className='text-right'>Al geregistreerd als docent? <Link href="/login"><a className='link'>Login</a></Link></p>
						<p className={ styles.success }>{ successMessage }</p>
						<p className={ styles.error }>{ errorMessage }</p>
					</div>
				</div>
			</form>
		</>
	)
}

export default RegisterForm
