import React from 'react'

// Components
import Layout from '../components/templates'
import LoginForm from '../components/molecules/Forms/LoginForm'
import BackgroundStripes from '../components/atoms/icons/BackgroundStripes'

// Styles
import styles from '../styles/pages/Login.module.scss'

const Login = () => (
	<Layout title="RLC - Login | Vives">
		<BackgroundStripes className={ styles.loginStripes } />
		<LoginForm />
	</Layout>
)

export default Login
