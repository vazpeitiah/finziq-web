import Radio from 'components/Radio/Radio'
import { SelectOption } from 'utils/types'

interface RadioGroupProps {
  options: SelectOption[]
  onChange: (value: string) => void
  value: string
  name: string
}

const RadioGroup = ({ options, onChange, value, name }: RadioGroupProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          name={name}
          onChange={() => onChange(option.value)}
          value={option.value}
          checked={value === option.value}
        />
      ))}
    </div>
  )
}

export default RadioGroup
