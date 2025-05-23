import React from 'react'

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  name: string
}

const Radio = ({ label, name, ...props }: RadioProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2">
        <span className="label-text">{label}</span>
        <input
          {...props}
          type="radio"
          name={name}
          className="radio"
          defaultChecked
        />
      </label>
    </div>
  )
}

export default Radio
