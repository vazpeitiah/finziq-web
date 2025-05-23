import clsx from 'clsx'

interface CheckBoxProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  id?: string
  label?: string
  name?: string
  checked?: boolean
  onChange?: (value: boolean) => void
  readOnly?: boolean
}

const CheckBox = ({
  id,
  label,
  name,
  checked,
  onChange,
  readOnly,
  ...props
}: CheckBoxProps) => {
  return (
    <div className="form-control py-2">
      <label htmlFor={id} className="label cursor-pointer gap-2">
        <span className="label-text">{label}</span>
        <input
          {...props}
          id={id}
          type="checkbox"
          className={clsx(`checkbox checkbox-sm`, {
            ['cursor-default']: readOnly
          })}
          readOnly={readOnly}
          name={name}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      </label>
    </div>
  )
}

export default CheckBox
