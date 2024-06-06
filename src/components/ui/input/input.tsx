import { cn } from '@utils'
import React from 'react'

type ContainerProps = {
  label: string
  error?: string | null
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  ContainerProps & {
    ref?: React.Ref<HTMLInputElement> | undefined
    isDisabled?: boolean
  }

export const InputContainer = ({
  label,
  error,
  children,
}: ContainerProps & { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-sm font-bold capitalize">
        {label}
      </label>
      {children}
      {error && <p className="text-sm font-bold text-error">{error}</p>}
    </div>
  )
}

export const Input = ({ ref, isDisabled, ...inputProps }: InputProps) => {
  return (
    <InputContainer {...inputProps}>
      <input
        id={inputProps.label}
        data-testid="input"
        disabled={isDisabled}
        ref={ref}
        className={cn('h-input rounded p-2 font-bold uppercase text-dark', {
          'border-error border': !!inputProps.error,
        })}
        {...inputProps}
      />
    </InputContainer>
  )
}
