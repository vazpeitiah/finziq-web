import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { formattedRoute } from 'utils/helpers'

export interface HeaderProps {
  title?: React.ReactNode
  controls?: React.ReactNode
  showBreadcrumbs?: boolean
}

const Header = ({ title, controls, showBreadcrumbs = true }: HeaderProps) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const baseName = pathname === '/' ? 'home' : ''

  return (
    <section>
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {title ?? formattedRoute(pathname, t, baseName)}
        </h1>
        <div className="flex gap-2 items-center">{controls}</div>
      </article>
      <div className="divider my-1" />
      {showBreadcrumbs && <Breadcrumbs />}
    </section>
  )
}

export default Header
