import Icon, { Icons } from 'components/Icon/Icon'
import { cn } from 'utils/helpers'

interface IconButtonProps {
  icon: Icons
  onClick?: () => void
  disabled?: boolean
}

const IconButton = ({ icon, onClick, disabled }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn('btn btn-ghost btn-xs')}
      disabled={disabled}
    >
      <Icon icon={icon} className="size-5" />
    </button>
  )
}

export default IconButton
