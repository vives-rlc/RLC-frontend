export enum Role {
	student = 'student',
	teacher = 'teacher',
	admin = 'admin'
}

export interface User {
	firstName: string,
	lastName: string,
	email: string,
	number: string,
	password: string
	role: Role
}

export interface ShowUserInfoDto {
	id: string,
	firstName: string,
	lastName: string,
	email: string,
}

export interface RegisterTeacherDto extends LoginDto {
	firstName: string
	lastName: string
	email: string
	role: Role
}

export interface LoginDto{
	number: string,
	password: string
}

export interface ActivateStudentDto extends LoginDto {
	activationToken: string
}