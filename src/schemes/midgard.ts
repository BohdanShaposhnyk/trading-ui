import { z } from 'zod'

export const BalancesSchema = z.object({
    height: z.string(),
    date: z.string(),
    coins: z.array(
        z.object({
            asset: z.string(),
            amount: z.string(),
        })
    )
})

export type BalancesResponse = z.infer<typeof BalancesSchema>

