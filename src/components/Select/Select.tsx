import InputContainer from 'components/InputContainer/InputContainer'
import { cn } from 'utils/helpers'
import { SelectOption } from 'utils/types'

interface SelectProps
  extends Omit<React.HTMLProps<HTMLSelectElement>, 'onChange'> {
  id: string
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[] | undefined
  error?: string
  showError?: boolean
  defaultValue?: string
  disabled?: boolean
}

const Select = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  showError,
  options,
  disabled,
  ...props
}: SelectProps) => {
  return (
    <InputContainer id={id} label={label} showError={showError} error={error}>
      <select
        {...props}
        disabled={disabled}
        className={cn('select select-sm select-bordered', {
          ['input-error']: showError,
          ['input-disabled']: disabled
        })}
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option disabled value="">
          -- Selecciona una opción --
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputContainer>
  )
}

export default Select
