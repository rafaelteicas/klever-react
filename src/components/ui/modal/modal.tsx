import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils'
import { createContext, use, useState } from 'react'

import { Button } from '../button/button'

type Props<T> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T> | undefined
}

type ModalContextProps = {
  isVisible: boolean
  openModal: () => void
  hideModal: () => void
}

const Container = ({ className, children, ref }: Props<HTMLDivElement>) => {
  const { isVisible, hideModal } = use(ModalContext)
  if (!isVisible) return

  return (
    <div role="dialog" className={cn('z-10', className)}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-onBackground/80 bg-background p-6">
        {children}
      </div>
      <div
        data-testid="modal-outside"
        className={cn('bg-dark/60 absolute inset-0 -z-10', className)}
        ref={ref}
        onClick={hideModal}
      />
    </div>
  )
}

const Header = ({ children }: Props<HTMLHeadingElement>) => {
  return (
    <header className="border-onBackground/80">
      <h2 className="text-lg font-semibold">{children}</h2>
    </header>
  )
}

const Description = ({
  children,
  className,
  ref,
  ...props
}: Props<HTMLDivElement>) => {
  return (
    <div className={cn('min-w-modal', className)} {...props} ref={ref}>
      <p className="text-sm text-onBackground/80">{children}</p>
    </div>
  )
}

const Footer = ({
  ref,
  className,
  children,
  ...props
}: Props<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className={cn(
        'mt-4 space-x-4 items-end justify-end flex flex-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const Action = ({ children, ...props }: Props<HTMLButtonElement>) => {
  return (
    <Button type="button" {...props}>
      {children}
    </Button>
  )
}

const Cancel = ({ children, ...props }: Props<HTMLButtonElement>) => {
  const { hideModal } = use(ModalContext)

  return (
    <Button type="button" preset="disabled" onClick={hideModal} {...props}>
      {children}
    </Button>
  )
}

const Trigger = ({
  children,
  asChild = true,
}: Props<HTMLButtonElement> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button'

  const { openModal } = use(ModalContext)
  return <Comp onClick={openModal}>{children}</Comp>
}

const ModalContext = createContext({} as ModalContextProps)

type ModalRootProps = {
  children: React.ReactNode
  visible?: boolean
}

const Root = ({ children, visible = false }: ModalRootProps) => {
  const [isVisible, setIsVisible] = useState(visible)

  function openModal() {
    setIsVisible(true)
  }

  function hideModal() {
    setIsVisible(false)
  }

  return (
    <ModalContext value={{ isVisible, openModal, hideModal }}>
      {children}
    </ModalContext>
  )
}

export const Modal = {
  Root,
  Container,
  Header,
  Description,
  Footer,
  Action,
  Cancel,
  Trigger,
}
