import { cn } from '@utils'
import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorMessage?: string | null
  ref?: React.Ref<HTMLInputElement> | undefined
  isDisabled?: boolean
}

export const Input = ({
  ref,
  isDisabled,
  label,
  errorMessage,
  ...inputProps
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-sm font-bold capitalize">
        {label}
      </label>
      <input
        id={label}
        data-testid="input"
        disabled={isDisabled}
        ref={ref}
        className={cn('h-input rounded p-2 font-bold uppercase text-dark', {
          'border-error border': !!errorMessage,
        })}
        {...inputProps}
      />
      {errorMessage && (
        <p className="text-sm font-bold text-error">{errorMessage}</p>
      )}
    </div>
  )
}
