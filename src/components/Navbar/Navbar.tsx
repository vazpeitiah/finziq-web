import { Coins } from 'iconoir-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import NavbarLink from 'components/NavbarLink/NavbarLink'
import { ROUTES } from 'utils/config'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav className={styles['app__nav']}>
      <h1 className={styles['app__nav__header']}>
        <Coins className="text-base" />
        <Link to={ROUTES.home}>{t('app.title')}</Link>
      </h1>
      <ul className="navbar-end flex flex-col gap-2 sm:flex-row">
        <li>
          <NavbarLink to={ROUTES.categories.root}>
            {t('categories.title')}
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to={ROUTES.accounts.root}>
            {t('accounts.title')}
          </NavbarLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
