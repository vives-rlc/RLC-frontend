export interface CreateTimeslotDto {
	startTime: Date
	endTime: Date
	isReserved: boolean
	date?: string
}

export interface AddTimeslotsToLabDto {
	labId: string
	timeslots: TimeslotDto[]
}

export interface TimeslotDto {
	startTime: Date
	endTime: Date
	isReserved: boolean
	isCompleted: boolean
	id?: string
}

export interface EditTimeslotDto {
	startTime: Date
	endTime: Date
}