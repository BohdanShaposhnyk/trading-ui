import { useQuery } from '@tanstack/react-query';
import { useWallet } from '../state/keplrWallet';
import { apiList } from '../api/apiList';
import { api } from '../api/client';
import { BalancesSchema } from '../schemes/thornode';
import { thornodeToHumanTickerMap } from '../const/coinTickerMap';

export const useBalances = () => {
    const { walletAddress, chainType } = useWallet();

    return useQuery(
        {
            queryKey: ['balances', walletAddress, chainType],
            queryFn: async () => {
                if (!walletAddress) return [];
                const res = await api(`${apiList.thornode.balances}${walletAddress}`, BalancesSchema);
                return res.balances;
            },
            select: (coins) => {
                return coins.map((coin) => {
                    // Convert from base units (1e8) to human-readable format
                    const rawAmount = coin.amount;
                    const amount = Number(rawAmount) / 100000000; // 1e8

                    return {
                        amount,
                        amountRaw: rawAmount,
                        denom: coin.denom in thornodeToHumanTickerMap ? thornodeToHumanTickerMap[coin.denom as keyof typeof thornodeToHumanTickerMap] : coin.denom,
                    };
                }).sort((a, b) => b.amount - a.amount); // sort descending by amount


            },
            enabled: !!walletAddress, // only fetch when connected
            refetchInterval: 100000, // optional: auto-refresh every 10s
        }
    );
};

