import { DefaultLayout } from '@components'
import { AddToken, EditToken, Wallet } from '@features'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Wallet />,
        id: 'home',
      },
      {
        path: '/add-token',
        element: <AddToken />,
        id: 'add-token',
      },
      {
        path: '/edit-token',
        element: <EditToken />,
        id: 'edit-token',
      },
    ],
  },
])
