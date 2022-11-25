import { StudentDto } from './student.dto'
import { TeacherDto } from './teacher.dto'
import { TimeslotDto } from './timeslot.dto'

interface CreateCourseTeacherDto {
	id: string
}

export interface CreateCourseDto{
	name: string
	teacher: CreateCourseTeacherDto
}

export interface Lab {
	id: string,
	name: string
	timeslots: TimeslotDto[]
}
export interface CourseDto{
	id: string
	labs: Lab[]
	teacher: TeacherDto
	name: string,
	students: StudentDto[]
}