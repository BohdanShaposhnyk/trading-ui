export enum CoinTicker {
    RUNE = 'RUNE',
    RUJI = 'RUJI',
    TCY = 'TCY',
    USDT = 'USDT',
    ETH = 'ETH',
    USDC = 'USDC',
}

export enum ThornodeTicker {
    RUNE = 'rune',
    RUJI = 'x/ruji',
    TCY = 'tcy',
    USDT = 'ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7',
    ETH_SEQURED = 'eth-eth',
    AVAX_USDC = 'avax-usdc-0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e'
}

export enum MidgardTicker {
    RUJI = 'THOR.RUJI',
    TCY = 'THOR.TCY',
    USDT = 'ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7',
    ETH = 'ETH.ETH',
    AVAX_USDC = 'AVAX.USDC-0XB97EF9EF8734C71904D8002F8B6BC66DD9C48A6E'
};

export const midgardToHumanTickerMap = {
    [MidgardTicker.RUJI]: CoinTicker.RUJI,
    [MidgardTicker.TCY]: CoinTicker.TCY,
    [MidgardTicker.USDT]: CoinTicker.USDT,
    [MidgardTicker.ETH]: CoinTicker.ETH,
    [MidgardTicker.AVAX_USDC]: CoinTicker.USDC,
} as const;

export const thornodeToHumanTickerMap = {
    [ThornodeTicker.RUNE]: CoinTicker.RUNE,
    [ThornodeTicker.RUJI]: CoinTicker.RUJI,
    [ThornodeTicker.TCY]: CoinTicker.TCY,
    [ThornodeTicker.USDT]: CoinTicker.USDT,
    [ThornodeTicker.ETH_SEQURED]: CoinTicker.ETH,
    [ThornodeTicker.AVAX_USDC]: CoinTicker.USDC,
} as const;