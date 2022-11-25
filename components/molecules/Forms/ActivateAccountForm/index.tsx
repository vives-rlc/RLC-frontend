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
import styles from './ActivateAccountForm.module.scss'

// Types
type FormData = {
	password: string,
	number: string
}
export type ActivateAccountProps = {
	number: string,
}
const ActivateAccountForm = ({ number }: ActivateAccountProps) => {
	const {
		register,
		handleSubmit,
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
			userService.activateAccount(data, number, setErrorMessage, setSuccessMessage)
		}
	}

	return (
		<>
			<form
				className={ styles.ActivateAccountForm }
				onSubmit={ handleSubmit(onSubmit) }
				noValidate
			>
				<div className={ styles.form }>
					<PageTitle title="Account activeren" />
					<div>
						<Input
							label="Gebruikersnummer"
							name='number'
							placeholder="r0000000"
							register={ register }
							className="input-ml-2"
							pattern={ /[rusmc][0-9]{7}/i }
							isRequired
							error={
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
							register={ register }
							isRequired
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
						<Button isDisabled={ !isDirty || !isValid }>Activeer</Button>

						<p className='text-right'>Account al geactiveerd? <Link href="/login"><a className='link'>Login</a></Link></p>
						<p className={ styles.success }>{ successMessage }</p>
						<p className={ styles.error }>{ errorMessage }</p>
					</div>
				</div>
			</form>

		</>
	)
}

export default ActivateAccountForm
