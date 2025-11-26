import React from 'react';
import { useWallet } from '../state/keplrWallet';

export const KeplrButton = () => {
    const { walletAddress, connected, connect, disconnect } = useWallet();

    return (
        <div>
            {connected ? (
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-semibold">{walletAddress}</span>
                    <button
                        onClick={() => disconnect()}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => connect()}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                    Connect Keplr
                </button>
            )}
        </div>
    );
};
