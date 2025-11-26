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


export const PoolsSchema = z.array(z.object({
    asset: z.string(),
    volume24h: z.string(),
    assetDepth: z.string(),
    runeDepth: z.string(),
    assetPrice: z.string(),
    assetPriceUSD: z.string(),
    poolAPY: z.string(),
    annualPercentageRate: z.string(),
    earnings: z.string(),
    earningsAnnualAsPercentOfDepth: z.string(),
    lpLuvi: z.string(),
    saversAPR: z.string(),
    status: z.string(),
    liquidityUnits: z.string(),
    synthUnits: z.string(),
    synthSupply: z.string(),
    units: z.string(),
    nativeDecimal: z.string(),
    saversUnits: z.string(),
    saversDepth: z.string(),
    totalCollateral: z.string(),
    totalDebtTor: z.string(),
}))

export type PoolsResponse = z.infer<typeof PoolsSchema>