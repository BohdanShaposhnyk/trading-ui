export const API_URL = {
    midgard: "https://midgard.ninerealms.com",
    thornode: "https://thornode.ninerealms.com",
} as const;

export const apiList = {
    midgard: {
        balance: `${API_URL.midgard}/v2/balance/`,
        pools: `${API_URL.midgard}/v2/pools`,
    },
    thornode: {
        balances: `${API_URL.thornode}/cosmos/bank/v1beta1/balances/`,
    }
} as const;

export type ApiList = typeof apiList;

export type ApiKey = keyof ApiList;

export type ApiValue = ApiList[ApiKey];