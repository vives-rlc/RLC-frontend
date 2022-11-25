export enum Protocol {
	telnet = 'telnet'
}

export class CreateConnectionDto {
	/**
	 * @example 'Router1'
	 */

	name?: string
	/**
	 * @example 'telnet'
	 */

	protocol: string
	/**
	 * @example '192.168.0.192'
	 */

	hostname: string
	/**
	 * @example 2010
	 */
	port: number

	userName?: string

	password?: string
}

export interface ConnectionDto extends CreateConnectionDto{
	id: string
}

export interface ConnectionResultDto {
	connectionToken: string,
	sway: string
}