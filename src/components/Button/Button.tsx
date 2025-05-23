import { cn } from 'utils/helpers'

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'error'
  | 'warning'
  | 'success'
  | 'outline'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
  variant?: Variant
  type?: HTMLButtonElement['type']
  className?: string
}

const Button = ({
  onClick,
  disabled,
  children,
  variant = 'primary',
  type = 'button',
  className
}: ButtonProps) => {
  return (
    <button
      className={cn('btn btn-xs', `btn-${variant}`, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
