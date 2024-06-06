import 'react-toastify/dist/ReactToastify.css'

import { WalletProvider } from '@context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { router } from './router'

const queryClient = new QueryClient()

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Klever Wallet" />
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WalletProvider>
      <ToastContainer />
    </HelmetProvider>
  )
}
