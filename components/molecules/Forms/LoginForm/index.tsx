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
import styles from './LoginForm.module.scss'

// Types
type FormData = {
	wachtwoord: string
	gebruikersnummer: string
}

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
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

	const onSubmit = (data: FormData) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
		} else {
			userService.login(data, setErrorMessage, setSuccessMessage)
		}
	}

	return (
		<>
			<form
				className={ styles.loginForm }
				onSubmit={ handleSubmit(onSubmit) }
				noValidate
			>
				<div className={ styles.form }>
					<PageTitle title="inloggen" />
					<div>
						<Input
							label="Gebruikersnummer"
							name='number'
							placeholder="r0000000"
							register={ register }
							className="input-ml-2"
							isRequired
							pattern={ /[rcusm][0-9]{7}/i }
							error={
								errors.gebruikersnummer &&
								'Je gebruikersnummer invullen is verplicht.'
							}
						/>
						<Input
							type="password"
							name='password'
							label="wachtwoord"
							placeholder="******"
							className="input-ml-2"
							register={ register }
						/>
						<input type="checkbox" id="honey" className="hidden" />
						<Button isDisabled={ !isDirty || !isValid }>Log in</Button>

						<p className='text-right'>Nog niet geregistreerd als docent? <Link href="/register"><a className='link'>Registreer</a></Link></p>
						<p className={ styles.success }>{ successMessage }</p>
						<p className={ styles.error }>{ errorMessage }</p>
					</div>
				</div>
			</form>

		</>
	)
}

export default LoginForm
