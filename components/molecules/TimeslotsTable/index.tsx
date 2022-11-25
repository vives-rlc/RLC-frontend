/* eslint-disable @typescript-eslint/ban-ts-comment */
import Router from 'next/router'
import React, { useMemo, useState } from 'react'
import { BsCheckSquare } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import {
	TbArrowsSort, TbSortDescending, TbSortAscending
} from 'react-icons/tb'
import {
	useTable, useFilters, useSortBy
} from 'react-table'
import { TimeslotDto } from '../../../libs/dtos/timeslot.dto'

import { formatDateTimeToTime } from '../../../utils/formatDate'

// Components
import DownArrow from '../../atoms/icons/DownArrow'
import Button from '../../atoms/SendButton/SendButton'

// Styles
import styles from './TimeslotsTable.module.scss'

export interface TimeslotsTableProps {
	allTimeslots: TimeslotDto[],
	onLaboDetail?: boolean
}
export const TimeslotsTable = ({ allTimeslots, onLaboDetail = false }: TimeslotsTableProps) => {
	const [clicked, setClicked] = useState(false)

	const data = useMemo(() => allTimeslots.filter(x => x), [])

	const onEditTimeslotClicked = (timeslotId) => {
		Router.push({ pathname: '/edittimeslot', query: timeslotId })
	}

	function SelectColumnFilter({
		column: {
			filterValue, setFilter, preFilteredRows, id
		},
	}) {
		// Calculate the options for filtering
		// using the preFilteredRows
		const options = useMemo(() => {
			const newOptions = new Set()
			preFilteredRows.forEach(row => {
				newOptions.add(row.values[id])
			})
			// @ts-ignore
			return [...newOptions.values()]
		}, [id, preFilteredRows])

		return (
			<div className={ styles.filter } onClick={ () => { setClicked(!clicked) } } onBlur={ () => setClicked(false) }>
				<select
					value={ filterValue }
					onChange={ e => {
						setFilter(e.target.value || undefined)
					} }
				>
					<option value="">Alle</option>
					{ options.map((option, i) => (
						<option key={ i } value={ option }>
							{ option }
						</option>
					)) }
				</select>
				<DownArrow className={ `transition-transform
				${clicked ? 'rotate-180' : 'rotate-0'}
		`} />
			</div>
		)
	}

	function SelectSpecialColumnFilter({
		column: {
			filterValue, setFilter, preFilteredRows, id
		},
	}) {

		const options = useMemo(() => {
			const newOptions = new Set()
			preFilteredRows.forEach(row => {
				newOptions.add(row.values[id])
			})
			// @ts-ignore
			return [...newOptions.values()]
		}, [id, preFilteredRows])

		return (
			<div className={ styles.filter } onClick={ () => { setClicked(!clicked) } } onBlur={ () => setClicked(false) }>
				<select
					value={ filterValue }
					onChange={ e => {
						setFilter(e.target.value || undefined)
					} }
				>
					<option value=''>Alle</option>
					{ options.map((option, i) => (
						<option key={ i } value={ option }>
							{ option === 'true' ? 'Gereserveerd' : 'Niet gereserveerd' }
						</option>
					)) }
				</select>
				<DownArrow className={ `transition-transform
				${clicked ? 'rotate-180' : 'rotate-0'}
		`} />
			</div>
		)
	}

	//const dateSort

	const laboDetailColumns = useMemo(
		() => [
			{
				Header: 'Wijzig',
				accessor: row => <Button variant='secondary' type="button" onClick={ () => onEditTimeslotClicked(row.id) }><MdModeEditOutline /> </Button>,
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Datum',
				accessor: row => new Date(row.startTime).toLocaleDateString('en-GB'),
				filterable: false,
				sortType: (a, b) => {
					//@ts-ignore
					return new Date(b.original.startTime) - new Date(a.original.startTime)
				},
			},
			{
				Header: 'Starttijd',
				accessor: row => formatDateTimeToTime(row.startTime),
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Eindtijd',
				accessor: row => formatDateTimeToTime(row.endTime),
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Gereserveerd',
				accessor: row => row.isReserved ? 'true' : 'false',
				Filter: SelectSpecialColumnFilter,
				filter: 'includes',
				disableSortBy: true
			},
			{
				Header: 'Student e-mail',
				accessor: 'student.user.email',
				filterable: false,
				disableSortBy: true
			},
		],
		[]
	)


	const defaultColumns = useMemo(
		() => [
			{
				Header: 'Wijzig',
				accessor: row => <Button variant='secondary' type="button" onClick={ () => onEditTimeslotClicked(row.id) }><MdModeEditOutline /> </Button>,
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Datum',
				accessor: row => new Date(row.startTime).toLocaleDateString('en-GB'),
				filterable: false,
				sortType: (a, b) => {
					//@ts-ignore
					return new Date(b.original.startTime) - new Date(a.original.startTime)
				},
			},
			{
				Header: 'Starttijd',
				accessor: row => formatDateTimeToTime(row.startTime),
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Eindtijd',
				accessor: row => formatDateTimeToTime(row.endTime),
				filterable: false,
				disableSortBy: true
			},
			{
				Header: 'Labo',
				accessor: 'lab.name',
				Filter: SelectColumnFilter,
				filter: 'includes'
			},
			{
				Header: 'Vak',
				accessor: 'lab.course.name',
				Filter: SelectColumnFilter,
				filter: 'includes'
			},
			{
				Header: 'Gereserveerd',
				accessor: row => row.isReserved ? 'true' : 'false',
				Filter: SelectSpecialColumnFilter,
				filter: 'includes',
				disableSortBy: true
			},
			{
				Header: 'Student e-mail',
				accessor: 'student.user.email',
				filterable: false,
				disableSortBy: true
			},
		],
		[]
	)

	const columns = onLaboDetail ? laboDetailColumns : defaultColumns

	const tableInstance = useTable({
		columns, data,
	}, useFilters, useSortBy)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	return (
		<table { ...getTableProps() } className={ styles.table } >
			<thead>
				{
					headerGroups.map((headerGroup, trKey) => (
						<tr { ...headerGroup.getHeaderGroupProps() } key={ trKey }>
							{
								headerGroup.headers.map((column, thKey) => (
									<th { ...column.getHeaderProps(column.getSortByToggleProps()) } key={ thKey }>
										{ column.render('Header') }
										<span>{ column.canSort && (column.isSorted ? column.isSortedDesc ? <TbSortDescending /> : <TbSortAscending /> : <TbArrowsSort />) }</span>
										<div>{ column.filter ? column?.render('Filter') : null }</div>
									</th>
								))
							}
						</tr>
					))
				}
			</thead>
			<tbody { ...getTableBodyProps() }>
				{ rows.map((row, rowIdx) => {
					prepareRow(row)
					return (
						<tr { ...row.getRowProps() } key={ rowIdx }>
							{ row.cells.map((cell, cellIdx) => {
								return (
									<td { ...cell.getCellProps() } key={ cellIdx }>
										{ cell.render('Cell')?.props?.cell?.value === 'true' ? <BsCheckSquare /> : cell.render('Cell')?.props?.cell?.value === 'false' ? '' : cell.render('Cell') }
									</td>
								)
							}) }
						</tr>
					)
				}) }
			</tbody>
		</table >
	)
}