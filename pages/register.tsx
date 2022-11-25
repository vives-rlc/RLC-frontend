import React from 'react'

// Components
import Layout from '../components/templates'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'
import RegisterForm from '../components/molecules/Forms/RegisterForm'

// Styles
import styles from '../styles/pages/Login.module.scss'


const Register = () => (
	<Layout title="RLC - Registreer | Vives">
		<BackgroundStripes className={ styles.loginStripes } />
		<RegisterForm />
	</Layout>
)

export default Register
