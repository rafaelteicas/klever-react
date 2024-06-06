import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils'
import React from 'react'
import { Link, To } from 'react-router-dom'

type Presets = 'primary' | 'secondary' | 'disabled'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  path?: To
  preset?: Presets
  disabled?: boolean
  asChild?: boolean
}

const variants = (preset: Presets) => {
  switch (preset) {
    case 'primary':
      return 'bg-primary hover:bg-primary/75'
    case 'secondary':
      return 'bg-error hover:bg-error/75'
    case 'disabled':
      return 'bg-disabled hover:bg-disabled/75'
    default:
      return 'bg-primary hover:bg-primary/75'
  }
}

const BaseButton = ({
  children,
  preset = 'primary',
  className,
  asChild,
  ...buttonProps
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-testid="button"
      className={cn(
        'h-button w-button rounded-md flex items-center justify-center',
        variants(preset),
        className,
      )}
      {...buttonProps}
    >
      <p className="text-base font-bold">{children}</p>
    </Comp>
  )
}

export const Button = ({ path, ...buttonProps }: ButtonProps) => {
  return path ? (
    <Link to={path}>
      <BaseButton asChild {...buttonProps} />
    </Link>
  ) : (
    <BaseButton {...buttonProps} />
  )
}
