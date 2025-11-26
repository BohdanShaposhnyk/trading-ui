import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { WalletProvider } from '../state/keplrWallet'
import { KeplrButton } from '../components/KeplrButton'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <WalletProvider>
      <div className="fixed top-8 right-8 z-50">
        <KeplrButton />
      </div>
      <div className="p-8 flex gap-2 text-lg">
        <Link
          to="/"
          className="text-gray-400 hover:text-gray-200"
          activeProps={{
            className: '!text-gray-200',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/portfolio"
          className="text-gray-400 hover:text-gray-200"
          activeProps={{
            className: '!text-gray-200',
          }}
        >
          Portfolio
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </WalletProvider>
  )
}
