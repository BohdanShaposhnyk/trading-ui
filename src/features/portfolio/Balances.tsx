import React from 'react';
import { useBalances } from '../../hooks/useBalances';
import { useWallet } from '../../state/keplrWallet';
import { TokenLogo } from '../../components/TokenLogo';
import { TokenTicker } from '../../components/TokenTicker';

export const Balances = () => {
    const { connected } = useWallet();
    const { data: coins, isLoading, isError } = useBalances();

    if (!connected) return <div>Connect your wallet to view your balances</div>;
    if (isLoading) return <div>Loading balances...</div>;
    if (isError) return <div>Error loading balances</div>;
    if (!coins || coins.length === 0) return <div>No balances</div>;

    return (
        <div className="space-y-2">
            {coins.map((coin) => (
                <div key={coin.denom} className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <TokenLogo ticker={coin.denom} />
                        <TokenTicker ticker={coin.denom} />
                    </div>
                    <span>{(+coin.amount / 1e8).toFixed(6)}</span>
                </div>
            )
            )}
        </div>
    );
};
