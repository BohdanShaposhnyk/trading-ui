import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { apiList } from '../api/apiList';
import { PoolsSchema } from '../schemes/midgard';
import { useWallet } from '../state/keplrWallet';
import { CoinTicker, midgardToHumanTickerMap } from '../const/coinTickerMap';

export const usePrices = () => {
    const { walletAddress } = useWallet();
    return useQuery({
        queryKey: ['prices'],
        queryFn: async () => {
            const res = await api(`${apiList.midgard.pools}`, PoolsSchema);
            return res;
        },
        enabled: !!walletAddress,
        refetchInterval: 100000,
        select: (pools) => {
            return pools.reduce((acc, pool) => {
                const asset = pool.asset in midgardToHumanTickerMap ? midgardToHumanTickerMap[pool.asset as keyof typeof midgardToHumanTickerMap] : pool.asset;
                // Infer RUNE price from USDT price using the ETH.USDT pool
                if (pool.asset === 'ETH.USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7') {
                    return { ...acc, [asset]: pool.assetPriceUSD, [CoinTicker.RUNE]: String(1 / parseFloat(pool.assetPrice)) };
                }
                return { ...acc, [asset]: pool.assetPriceUSD };
            }, {} as Record<string, string>);
        },
    });
};