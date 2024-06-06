import { WalletProvider } from '@context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

function wrapper({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <WalletProvider>{children}</WalletProvider>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

function customRender(
  component: React.ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {
    wrapper,
    ...options,
  })
}

function customRenderHook<Props, Result>(
  render: (initialProps: Props) => Result,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return renderHook(render, {
    wrapper,
    ...options,
  })
}

export * from '@testing-library/react'

export { customRender as render }
export { customRenderHook as renderHook }
