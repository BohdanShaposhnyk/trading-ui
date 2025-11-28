import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { WalletProvider } from '../state/keplrWallet'
import { KeplrButton } from '../components/KeplrButton'
import { ThemeProvider } from '../components/theme-provider'
import { ThemeToggle } from '../components/ThemeToggle'
import { Toaster } from '../components/ui/sonner'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="trading-ui-theme">
      <WalletProvider>
        <div className="fixed top-8 right-8 z-50">
          <KeplrButton />
        </div>
        <div className="fixed bottom-4 left-4 z-50">
          <ThemeToggle />
        </div>
        <div className="p-8 flex gap-2 text-lg">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            activeProps={{
              className: '!text-foreground',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/portfolio"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            activeProps={{
              className: '!text-foreground',
            }}
          >
            Portfolio
          </Link>
        </div>
        <Outlet />
        <Toaster position="top-center" richColors />
        <TanStackRouterDevtools position="bottom-right" />
      </WalletProvider>
    </ThemeProvider>
  )
}
