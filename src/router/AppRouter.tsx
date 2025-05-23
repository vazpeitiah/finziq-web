import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from 'utils/config'
import AccountPage from 'views/Accounts/AccountPage'
import AccountForm from 'views/Accounts/Components/AccountForm'
import CategoriesPage from 'views/Categories/CategoriesPage'
import CategoryForm from 'views/Categories/Components/CategoryForm'
import HomePage from 'views/Home/HomePage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.accounts.root} element={<AccountPage />} />
        <Route path={ROUTES.accounts.add} element={<AccountForm />} />
        <Route path={ROUTES.accounts.edit} element={<AccountForm />} />
        <Route path={ROUTES.categories.root} element={<CategoriesPage />} />
        <Route path={ROUTES.categories.add} element={<CategoryForm />} />
        <Route
          path={`${ROUTES.categories}/:categoryId`}
          element={<CategoriesPage />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
