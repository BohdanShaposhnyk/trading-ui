import { z } from 'zod'

export const BalancesSchema = z.object({
    balances: z.array(
        z.object({
            denom: z.string(),
            amount: z.string()
        })
    ),
    pagination: z.object({
        next_key: z.string().nullable(),
        total: z.string()
    })
})

export type BalancesResponse = z.infer<typeof BalancesSchema>
