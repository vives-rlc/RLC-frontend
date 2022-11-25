import {
	ConnectionDto, CreateConnectionDto, Protocol
} from './connection.dto'
import { CreateTimeslotDto, TimeslotDto } from './timeslot.dto'

interface CreateLabCourseDto {
	id: string
}

export interface CreateLabDto {
	sway: string,
	name: string,
	connection: CreateConnectionDto
	course?: CreateLabCourseDto
	timeslots: CreateTimeslotDto[]
}

export interface UpdateLabDto {
	name: string
	sway: string
	connection: ConnectionDto
}

export interface LabDto {
	id: string
	name: string
	sway: string
	connection: {
		name: string
		protocol: Protocol
		hostname: string
		port: number
		userName: string
		password: string
		id: string
	}
	timeslots: TimeslotDto[]
}