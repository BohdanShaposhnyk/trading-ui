import { useBalances } from './useBalances';
import { usePrices } from './usePrices';
import { useMemo } from 'react';

export const usePortfolioValue = () => {
    const { data: balances } = useBalances();
    const { data: prices } = usePrices();

    const portfolioValue = useMemo(() => {
        if (!balances || !prices) return 0;
        const value = balances.reduce((acc, balance) => {
            return acc + (parseFloat(prices[balance.denom] ?? '0') * balance.amount);
        }, 0);
        return Number(value).toFixed(2);
    }, [balances, prices]);

    return {
        portfolioValue,
        isLoading: !balances || !prices,
        isError: !!balances && !!prices && portfolioValue === undefined,
    };
};