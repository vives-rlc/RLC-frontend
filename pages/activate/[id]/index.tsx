import React from 'react'

// Components
import Layout from '../../../components/templates'
import BackgroundStripes from '../../../components/atoms/icons/BackgroundStripes'

// Styles
import styles from '../../../styles/pages/Login.module.scss'
import { useRouter } from 'next/router'
import ActivateAccountForm from '../../../components/molecules/Forms/ActivateAccountForm'

const ActivateAccount = () => {
	const router = useRouter()
	const { id } = router.query
	return (
		<Layout title="RLC - Change Password | Vives">
			<BackgroundStripes className={ styles.loginStripes } />
			<ActivateAccountForm number={ id as string } />
		</Layout>)
}

export default ActivateAccount
