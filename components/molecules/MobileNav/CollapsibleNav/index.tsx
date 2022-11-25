import React from 'react'
import Link from 'next/link'

import { NavItem } from '../../MobileNav'

// Types
interface CollapsibleNavProps {
  links: NavItem[]
  navOpen: boolean
  className?: string
}

const CollapsibleNav: React.FC<CollapsibleNavProps> = ({
	links,
	navOpen,
	className,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{navOpen && links.map(({ name, link }) => (
				<Link href={link} key={name}>
					<a className="pb-2 focus:underline">{name}</a>
				</Link>
			))}
		</div>
	)
}

export default CollapsibleNav
