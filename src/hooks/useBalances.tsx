import { useQuery } from '@tanstack/react-query';
import { useWallet } from '../state/keplrWallet';
import { apiList } from '../api/apiList';
import { api } from '../api/client';
import { BalancesSchema } from '../schemes/thornode';

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
            select: (balances) =>
                balances.sort((a, b) => Number(b.amount) - Number(a.amount)), // sort descending by amount
            enabled: !!walletAddress, // only fetch when connected
            refetchInterval: 100000, // optional: auto-refresh every 10s
        }
    );
};

