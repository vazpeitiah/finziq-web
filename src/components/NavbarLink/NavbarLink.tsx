import { Link, useLocation } from 'react-router-dom'

import { cn } from 'utils/helpers'

interface NavbarLinkProps {
  children?: React.ReactNode
  to: string
  disabled?: boolean
}

const NavbarLink = ({ children, to, disabled }: NavbarLinkProps) => {
  const { pathname } = useLocation()
  const active = pathname.startsWith(to)

  return disabled ? (
    <button disabled className="btn btn-ghost text-xs">
      {children}
    </button>
  ) : (
    <Link to={to}>
      <button
        className={cn('btn btn-ghost text-xs', {
          'border-2 border-primary': active
        })}
      >
        {children}
      </button>
    </Link>
  )
}

export default NavbarLink
