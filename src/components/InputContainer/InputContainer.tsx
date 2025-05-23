interface InputContainerProps {
  id: string
  label: string
  error?: string
  showError?: boolean
  children: React.ReactNode
}

const InputContainer = ({
  id,
  label,
  error,
  showError,
  children
}: InputContainerProps) => {
  return (
    <label className="form-control w-full" htmlFor={id}>
      <div className="label ml-1">
        <span className="label-text text-sm">{label}</span>
      </div>
      {children}
      {showError && (
        <div className="label">
          <span className="label-text-alt text-xs text-error">{error}</span>
        </div>
      )}
    </label>
  )
}

export default InputContainer
