export type ChainType = 'mainnet' | 'testnet';

const CHAIN_IDS = {
    mainnet: 'thorchain-mainnet-v1',
    testnet: 'thorchain-testnet-v2',
};

export const ThorchainMainnet = {
    chainId: CHAIN_IDS.mainnet,
    chainName: 'THORChain Mainnet',
    rpc: 'https://rpc.thorchain.info',
    rest: 'https://lcd.thorchain.info',
    bip44: { coinType: 931 },
    bech32Config: {
        bech32PrefixAccAddr: 'thor',
        bech32PrefixAccPub: 'thorpub',
        bech32PrefixValAddr: 'thorvaloper',
        bech32PrefixValPub: 'thorvaloperpub',
        bech32PrefixConsAddr: 'thorvalcons',
        bech32PrefixConsPub: 'thorvalconspub',
    },
    currencies: [{ coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 }],
    feeCurrencies: [{ coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 }],
    stakeCurrency: { coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 },
} as const;

export const ThorchainTestnet = {
    chainId: CHAIN_IDS.testnet,
    chainName: 'THORChain Testnet',
    rpc: 'https://testnet-rpc.thorchain.info',
    rest: 'https://testnet-lcd.thorchain.info',
    bip44: { coinType: 931 },
    bech32Config: {
        bech32PrefixAccAddr: 'thor',
        bech32PrefixAccPub: 'thorpub',
        bech32PrefixValAddr: 'thorvaloper',
        bech32PrefixValPub: 'thorvaloperpub',
        bech32PrefixConsAddr: 'thorvalcons',
        bech32PrefixConsPub: 'thorvalconspub',
    },
    currencies: [{ coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 }],
    feeCurrencies: [{ coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 }],
    stakeCurrency: { coinDenom: 'RUNE', coinMinimalDenom: 'rune', coinDecimals: 8 },
} as const;