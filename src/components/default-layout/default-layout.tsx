import { ShootingStar } from '@assets'
import { Button } from '@components'
import { Outlet, useLocation } from 'react-router-dom'

export function DefaultLayout() {
  const location = useLocation()

  return (
    <main className="py-8">
      <header className="mb-12 flex justify-center">
        <img src="/logo.svg" className="size-1/3" />
      </header>

      <div className="mb-8 flex items-center justify-between">
        <span className="flex items-center gap-4">
          <ShootingStar className="size-12 fill-secondary" />
          <h1>Wish Wallet</h1>
        </span>
        {location.pathname === '/' && (
          <Button preset="primary" path="/add-token">
            Add Token
          </Button>
        )}
      </div>

      <Outlet />
    </main>
  )
}
