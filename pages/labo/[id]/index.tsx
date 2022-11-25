import React, { useEffect, useState } from 'react'
import { MdModeEditOutline, MdOutlineAdd } from 'react-icons/md'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import Router from 'next/router'
import { unescape, escape } from 'html-escaper'
import { useForm } from 'react-hook-form'

// Styles
import styles from '../../../styles/pages/LaboDetails.module.scss'

// Components
import Layout from '../../../components/templates'
import BackgroundStripes from '../../../components/atoms/icons/BackgroundStripes'
import Card from '../../../components/atoms/Card'
import Button from '../../../components/atoms/SendButton/SendButton'
import PageTitle from '../../../components/atoms/PageTitle'
import Select from '../../../components/atoms/Select'
import Textarea from '../../../components/atoms/Textarea'
import Input from '../../../components/atoms/Input'
import { TimeslotsTable } from '../../../components/molecules/TimeslotsTable'

// Services
import { LabDto, UpdateLabDto } from '../../../libs/dtos/lab.dto'
import { labService } from '../../../services/lab.service'
import { Role, User } from '../../../libs/dtos/user.dto'
import { userService } from '../../../services/user.service'
import { reservationService } from '../../../services/reservation.service'
import { CreateReservationDto } from '../../../libs/dtos/reservation.dto'
import { Protocol } from '../../../libs/dtos/connection.dto'

// Utils
import { formatDateTimeToTime, formatDateTimeReservation } from '../../../utils/formatDate'
import Loader from '../../../components/atoms/Loader'
import { decrypt, encrypt } from '../../../utils/encryptDecrypt'

const LaboDetail = () => {
	const [user, setUser] = useState<User>(null)
	const [labo, setLabo] = useState<LabDto>(null)
	const [studentId, setStudentId] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [editLabo, setEditLabo] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	useEffect(() => {
		setUser(userService.getUserInfo())
		Router.query.id && labService.getLaboById(setLabo, Router.query.id)
		userService.getStudentOrTeacherId().then((response) => setStudentId(response))
	}, [studentId])

	const addTimeSlotClicked = () => {
		Router.push({ pathname: '/addtimeslot', query: labo.id })
	}

	const onClickTimeslot = (item) => {
		const body: CreateReservationDto = {
			student: {
				id: studentId
			},
			timeslot: {
				id: item.id
			}
		}
		reservationService.createReservation(JSON.stringify(body), setErrorMessage, setSuccessMessage)
	}

	const {
		register, handleSubmit, formState: { errors }
	} = useForm({
		mode: 'onTouched', defaultValues: {
			name: labo?.name,
			sway: labo?.sway,
			connection: {
				userName: labo?.connection?.userName,
				password: labo?.connection?.password && JSON.stringify(decrypt(labo?.connection?.password)),
				name: labo?.connection?.name,
				protocol: labo?.connection?.protocol,
				hostname: labo?.connection?.hostname,
				port: labo?.connection?.port,
				id: labo?.connection?.id
			},
		}
	})

	const onSubmit = (data) => {
		if ((document.getElementById('honey') as HTMLInputElement).checked) {
			setErrorMessage('Er ging iets mis. Probeer het later opnieuw')
		} else {
			const updateLabDto: UpdateLabDto = {
				name: data.name,
				sway: escape((data.sway).replace(/"/g, '\'')),
				connection: {
					userName: data?.connection?.userName,
					password: data?.connection?.password && encrypt(data?.connection?.password),
					hostname: data?.connection?.hostname,
					name: data?.connection?.name,
					port: data?.connection?.port,
					protocol: data?.connection?.protocol,
					id: labo.connection.id
				}
			}
			const body = JSON.stringify(updateLabDto)
			labService.updateLab(labo.id, body, setErrorMessage, setSuccessMessage)
		}
	}

	const onEyeClicked = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	const stringToDots = (string: string) => {
		let result = ''
		for (let i = 0; i < string.length; i++) {
			result = result.concat('●')
		}
		return result
	}

	return (
		<Layout title="Labodetails - Remote Lab Connection | Vives">
			<div className={ `container ${styles.laboDetails}` }>
				<BackgroundStripes className={ styles.backgroundStripes } />
				{
					user ? <Card>
						{ labo ?
							<div className={ styles.card }>
								{ user.role === Role.teacher &&
									<form onSubmit={ handleSubmit(onSubmit) }>
										<div className={ styles.buttonTitleRow }>
											<PageTitle title={ labo.name } inputObject={ labo } isInput={ editLabo } register={ register } />
											{
												editLabo ? <Button type='button' onClick={ () => { setEditLabo(false) } } >  Opslaan</Button> : <Button type='submit' onClick={ () => { setEditLabo(true) } } >    <MdModeEditOutline /> Wijzig labo</Button>
											}
										</div>
										<p>{ successMessage }</p>
										<p className='error'>{ errorMessage }</p>
										<div className={ styles.teacherDetails }>
											<h2>Routerinstellingen</h2>
											{
												editLabo ?
													<>
														<Input
															label='Naam van connectie'
															register={ register }
															name='connection.name'
															defaultValue={ labo?.connection?.name }
															isRequired
															placeholder='Router 1'
															error={ errors.name && 'De naam van het labo invullen is verplicht' }
														/>
														<Select
															label='Protocol'
															register={ register }
															name='connection.protocol'
															options={ Object.values(Protocol) }
															defaultSelect={ Protocol.telnet }
															isRequired
															error={
																(errors.connection?.protocol && 'Het protocol invullen, is verplicht.')
															}
														/>
														<Input
															label='Hostname'
															name='connection.hostname'
															defaultValue={ labo?.connection?.hostname }
															register={ register }
															placeholder='192.160.8.2'
															isRequired
															error={
																(errors.connection?.hostname && 'De hostname invullen, is verplicht.')
															}
														/>
														<Input
															label='Poort'
															name='connection.port'
															defaultValue={ labo?.connection?.port }
															register={ register }
															placeholder='8909'
															type='number'
															isRequired
															error={
																(errors.connection?.port && 'De poort invullen, is verplicht.')
															}
														/>
														<Input
															label='Gebruikersnaam'
															name='connection.userName'
															defaultValue={ labo?.connection?.userName }
															register={ register }
															placeholder='user'
															isRequired={ false }
														/>
														<Input
															label='Wachtwoord'
															name='connection.password'
															defaultValue={ labo?.connection?.password && decrypt(labo?.connection?.password).toString() }
															register={ register }
															placeholder='*****'
															type={ isPasswordVisible ? 'text' : 'password' }
															isRequired={ false }
															unit={ isPasswordVisible ? <AiOutlineEye onClick={ onEyeClicked } style={ { 'cursor': 'pointer' } } /> : <AiOutlineEyeInvisible onClick={ onEyeClicked } style={ { 'cursor': 'pointer' } } /> }
														/>
													</> :
													<>
														<strong>Naam:</strong> { labo.connection?.name } <br />
														<strong>Protocol:</strong> { labo.connection?.protocol } <br />
														<strong>Hostname:</strong> { labo.connection?.hostname } <br />
														<strong>Poort:</strong> { labo.connection?.port } <br />
														<strong>Gebruikersnaam:</strong> { labo.connection?.userName ? labo.connection?.userName : <i>Geen gebruikersnaam ingesteld</i> } <br />
														<strong>Wachtwoord:</strong> { labo.connection?.password ? (isPasswordVisible ? decrypt(labo.connection?.password).toString() : stringToDots(decrypt(labo.connection?.password).toString())) : <i>Geen wachtwoord ingesteld</i> }{ labo.connection?.password && (isPasswordVisible ? <AiOutlineEye style={ { 'marginLeft': '8px', 'cursor': 'pointer' } } onClick={ onEyeClicked } /> : <AiOutlineEyeInvisible onClick={ onEyeClicked } style={ { 'marginLeft': '8px', 'cursor': 'pointer' } } />) }<br />
													</>
											}


											<h2>Instructies</h2>
											{
												editLabo ? <Textarea
													label='Sway embed code'
													name='sway'
													defaultValue={ unescape(labo?.sway) }
													register={ register }
													placeholder='<iframe ...> ... </iframe>'
												/> : <div className={ styles.code }>{ unescape(labo.sway) }</div>
											}

											<input type="checkbox" id="honey" className='hidden' />

											<div className={ styles.buttonTitleRow }>
												<h2>Tijdsloten</h2>
												<Button type='button' onClick={ addTimeSlotClicked }><MdOutlineAdd />Tijdslot toevoegen</Button>
											</div>
											{
												labo?.timeslots.length !== 0 &&
												<TimeslotsTable allTimeslots={ labo?.timeslots } onLaboDetail={ true } />
											}
										</div>

									</form>
								}
								{ user.role === Role.student &&
									<>
										<PageTitle title={ `Reserveer tijdslot voor ${labo.name}` } />
										{
											labo.timeslots?.length !== 0 ? (
												<>
													<ul>
														{
															labo.timeslots?.map((item, idx) => (
																<li key={ idx }>
																	{ formatDateTimeReservation(item.startTime) } tot { formatDateTimeToTime(item.endTime) }
																	<Button onClick={ () => { onClickTimeslot(item) } }>Reserveer</Button>
																</li>
															))
														}
													</ul>
													<p className='text-center'>{ successMessage }</p>
													<p className='error text-center'>{ errorMessage }</p>
												</>
											) : (
												<p>Geen tijdsloten meer beschikbaar voor dit labo. Neem contact op met uw docent.</p>
											)
										}

									</>
								}
							</div> :
							<p>Geen details voor dit labo gevonden.</p>
						}
					</Card> : <Loader />
				}
			</div>
		</Layout>
	)
}

export default LaboDetail