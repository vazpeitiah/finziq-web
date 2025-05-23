import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button, Icon, IconButton, Icons, Table } from 'components'
import AppFrame from 'frames/AppFrame'
import { Account } from 'models/Account'
import { useAlerts } from 'providers/AlertsProvider'
import useDeleteAccount from 'queries/accounts/useDelelteAccount'
import useGetAccounts from 'queries/accounts/useGetAccounts'
import { ROUTES } from 'utils/config'

const AccountPage = () => {
  const alerts = useAlerts()
  const navigate = useNavigate()
  const { accounts } = useGetAccounts()
  const { t } = useTranslation()
  const { deleteAccount } = useDeleteAccount()

  const handleAdd = () => {
    navigate(ROUTES.accounts.add)
  }

  const handleEdit = (account: Account) => {
    navigate(ROUTES.accounts.edit, { state: account })
  }

  const handleRemove = (id: string) => {
    alerts.confirm(t('accounts.confirmDelete'), () => {
      deleteAccount(id)
    })
  }

  return (
    <AppFrame
      controls={
        <Button onClick={handleAdd}>
          {t('buttons.add')}
          <Icon icon={Icons.Plus} />
        </Button>
      }
    >
      <Table
        data={accounts}
        columns={[
          {
            id: 'name',
            header: t('accounts.name')
          },
          {
            id: 'type',
            header: t('accounts.type'),
            render: (row) => t(`accounts.catalogType.${row.type}`)
          },
          {
            id: 'includeInTotal',
            header: t('accounts.includeInTotal'),
            render: (row) => (
              <input
                type="checkbox"
                checked={row.includeInTotal}
                readOnly
                className="checkbox checkbox-xs"
              />
            )
          },
          {
            id: 'actions',
            render: (row) => (
              <>
                <IconButton icon={Icons.Edit} onClick={() => handleEdit(row)} />
                <IconButton
                  icon={Icons.Remove}
                  onClick={() => handleRemove(row.id)}
                />
              </>
            )
          }
        ]}
      />
    </AppFrame>
  )
}

export default AccountPage
