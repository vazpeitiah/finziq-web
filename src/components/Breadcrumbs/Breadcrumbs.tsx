import { t } from 'i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Icon, Icons } from 'components'
import { formattedRoute } from 'utils/helpers'

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const names = pathname.split('/').filter((path) => path)
  const paths = names.map((_, index) => names.slice(0, index + 1).join('/'))
  const buildPath = (path: string) => `/${path}`

  const handleBack = () => {
    navigate(-1)
  }

  if (paths.length <= 1) return null
  return (
    <div className="breadcrumbs text-xs pt-0 flex justify-between">
      <ul>
        {paths.map((path) => (
          <li key={path}>
            {buildPath(path) !== pathname ? (
              <Link to={buildPath(path)}>
                <button className="link link-secondary">
                  {formattedRoute(path, t)}
                </button>
              </Link>
            ) : (
              formattedRoute(path, t)
            )}
          </li>
        ))}
      </ul>
      <button className="btn btn-ghost btn-xs" onClick={handleBack}>
        <Icon icon={Icons.Back} width={16} height={16} />
      </button>
    </div>
  )
}

export default Breadcrumbs
