import React, { useEffect, useState } from 'react'
import { MdModeEditOutline, MdOutlineAdd } from 'react-icons/md'
import Router from 'next/router'

import { useForm } from 'react-hook-form'

// Template
import Layout from '../../../components/templates'

// Styles
import styles from '../../../styles/pages/CourseDetail.module.scss'

// Components
import BackgroundStripes from '../../../components/atoms/icons/BackgroundStripes'
import Card from '../../../components/atoms/Card'
import Button from '../../../components/atoms/SendButton/SendButton'
import PageTitle from '../../../components/atoms/PageTitle'
import Loader from '../../../components/atoms/Loader'
import Search from '../../../components/atoms/Search'

// Services
import { CourseDto } from '../../../libs/dtos/course.dto'
import { courseService } from '../../../services/course.service'
import { Role, User } from '../../../libs/dtos/user.dto'
import { userService } from '../../../services/user.service'
import { diffToToday, formatDateTimeReservation } from '../../../utils/formatDate'
import { StudentDto } from '../../../libs/dtos/student.dto'

// Variables
import { fifteenMinutes } from '../../../libs/variables'

const CourseDetail = () => {
	const [course, setCourse] = useState<CourseDto>(null)
	const [changeName, setChangeName] = useState(false)
	const [courseName, setCourseName] = useState('')
	const [user, setUser] = useState<User>()
	const [studentsResult, setStudentsResult] = useState<StudentDto[]>()

	useEffect(() => {
		setUser(userService.getUserInfo())
		Router.query.id && courseService.getCourseById(setCourse, Router.query.id)
	}, [Router.query.id])

	const {
		register, handleSubmit, watch
	} = useForm({
		mode: 'onTouched', defaultValues: {
			name: course?.name,
			query: ''
		}
	})
	const query = watch('query')

	useEffect(() => {
		setCourseName(course?.name)
		if (user?.role === Role.teacher) {
			setStudentsResult(course?.students)
			const arr = []
			course?.students.forEach(element => {
				const fullName = element.user.firstName + ' ' + element.user.lastName
				if (fullName.toLowerCase().includes(query.toLowerCase())) {
					arr.push(element)
				}
			})
			setStudentsResult(arr)
		}
	}, [course, query])

	const onSubmit = (data) => {
		courseService.updateCourseName(course?.id, { name: data.name }, setCourseName).catch((e) => { console.error(e) })
		setChangeName(false)
	}

	return (
		<Layout title="Vakdetails - Remote Lab Connection | Vives">
			<div className={ ` container ${styles.courseDetails} ` }>
				<BackgroundStripes className={ styles.backgroundStripes } />
				{ course ? <Card>
					<>
						{
							user?.role === Role.student &&
							<>
								<PageTitle title={ course?.name } />
								<div className={ styles.studentCard }>
									<p>
										<span>Docent:</span> { course?.teacher?.user?.firstName } { course?.teacher?.user?.lastName } -{ ' ' }
										<a href={ `mailto:${course.teacher.user.email}` }>{ course?.teacher?.user?.email }</a>
									</p>
									<ul className={ styles.toDoLab }>
										{ course?.labs?.map((lab, IDX) => <div key={ IDX }>
											{ lab?.timeslots?.length !== 0 && lab?.timeslots?.filter((timeslot) => timeslot.isReserved).map((timeslot, idx) => (
												<li key={ idx }>
													<p><strong>{ lab.name }</strong> - { formatDateTimeReservation(timeslot.startTime) }</p>
													<Button
														isDisabled={ (diffToToday(timeslot?.startTime)) >= fifteenMinutes }
														onClick={ () => {
															Router.push({ pathname: '/labo', query: timeslot.id })
														} }
													>Start labo
													</Button>
												</li>
											)) }
										</div>) }
									</ul>
									<h2>Nog te reserveren</h2>
									<ul className={ styles.toBookLab }>
										{ course?.labs?.filter(item => item?.timeslots?.length === 0).map((toBookLab, idx) =>
											<li key={ idx }><Button variant='secondary' onClick={ () => Router.push({ pathname: `/labo/${toBookLab.id}` }) }>{ toBookLab?.name }</Button></li>) }
									</ul>
									<h2>Voltooid</h2>
									<ul className={ styles.completedLab }>
										{ course?.labs?.map((lab, IDX) => <div key={ IDX }>
											{ lab?.timeslots?.length !== 0 && lab?.timeslots?.filter((timeslot) => timeslot.isCompleted).map((timeslot, idx) => (
												<li key={ idx }>
													<strong>{ lab.name }</strong> - { formatDateTimeReservation(timeslot.startTime) }
												</li>
											)) }
										</div>) }
									</ul>
								</div>
							</>
						}
						{
							user?.role === Role.teacher &&
							<>
								<div className={ styles.editCourse }>
									<PageTitle title={ courseName } register={ register } inputObject={ course } isInput={ changeName } onSubmit={ handleSubmit(onSubmit) } />
									{ !changeName &&
										<Button variant='secondary' type='button' onClick={ () => setChangeName(!changeName) }><MdModeEditOutline /></Button>
									}
								</div>
								<div className={ styles.teacherCard }>
									<div className={ styles.labs }>
										<h2>Labo`s</h2>
										<Button onClick={ () => Router.push({ pathname: '/createlab', query: course.id }) }><MdOutlineAdd /> Voeg labo`s toe</Button>
										<ul>
											{ course?.labs?.length !== 0 ? course?.labs?.map((item) => <li className={ styles.labDetail } key={ item?.id }>
												<Button variant='secondary' onClick={ () => Router.push({ pathname: `/labo/${item.id}` }) }>{ item?.name }</Button></li>) : <p>Nog geen labo&apos;s toegevoegd</p> }
										</ul>
									</div>
									<div className={ styles.students }>
										<h2>
											Studenten
										</h2>
										<Button onClick={ () => Router.push({ pathname: '/addstudentstocourse', query: course.id }) }><MdOutlineAdd /> Voeg studenten toe</Button>
										<Search register={ register } searchTerm="student" />
										<ul>
											{ studentsResult?.length !== 0 ? studentsResult?.map((item) => <li key={ item?.user?.id }>
												<p>{ item?.user?.firstName } { item?.user?.lastName }</p> <a href={ `mailto:${item?.user?.email}` }>{ item?.user?.email }</a></li>) : <p>Nog geen studenten toegevoegd</p> }
										</ul>
									</div>
								</div>
							</>
						}
					</>
				</Card> :
					<Loader /> }
			</div >
		</Layout >
	)
}

export default CourseDetail
