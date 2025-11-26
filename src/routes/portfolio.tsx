import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Portfolio } from '../features/portfolio'

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
})
