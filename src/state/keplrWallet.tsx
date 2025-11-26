import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ThorchainMainnet, ThorchainTestnet, ChainType } from '../const/chainData';

declare global {
    interface Window {
        keplr?: any;
        getOfflineSigner?: any;
    }
}

interface WalletState {
    walletAddress: string | null;
    connected: boolean;
    chainId: string;
    chainType: ChainType;
    connect: (chainType?: ChainType) => Promise<void>;
    disconnect: () => void;
}

const WalletContext = createContext<WalletState>({
    walletAddress: null,
    connected: false,
    chainId: 'thorchain-mainnet-v1',
    chainType: 'mainnet',
    connect: async () => { },
    disconnect: () => { },
});

interface WalletData {
    address: string;
    chainId: string;
    chainType: ChainType;
}

const CHAIN_IDS = {
    mainnet: 'thorchain-mainnet-v1',
    testnet: 'thorchain-testnet-v2',
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    const suggestChain = async (chainType: ChainType = 'mainnet') => {
        const chainId = CHAIN_IDS[chainType];

        if (!window.keplr?.experimentalSuggestChain) return;

        await window.keplr.experimentalSuggestChain(chainType === 'mainnet' ? ThorchainMainnet : ThorchainTestnet);
    };

    const connectWallet = async (chainType: ChainType = 'mainnet') => {
        const chainId = CHAIN_IDS[chainType];

        if (!window.keplr) {
            alert('Keplr wallet not installed');
            return null;
        }

        try {
            await window.keplr.enable(chainId);
        } catch {
            await suggestChain(chainType);
            await window.keplr.enable(chainId);
        }

        const offlineSigner = window.getOfflineSigner!(chainId);
        const accounts = await offlineSigner.getAccounts();
        return { address: accounts[0].address, chainId, chainType };
    };

    const { data } = useQuery<WalletData | null>({
        queryKey: ['keplrWallet'],
        queryFn: () => connectWallet(),
        enabled: false,
    });

    const connect = async (chainType: ChainType = 'mainnet') => {
        try {
            const wallet = await connectWallet(chainType);
            if (wallet) {
                queryClient.setQueryData(['keplrWallet'], wallet);
            }
        } catch (err) {
            console.error('Failed to connect Keplr:', err);
        }
    };

    const disconnect = () => {
        queryClient.setQueryData(['keplrWallet'], null);
    };

    const walletAddress = data?.address ?? null;
    const connected = !!walletAddress;
    const chainId = data?.chainId ?? CHAIN_IDS.mainnet;
    const chainType = data?.chainType ?? 'mainnet';

    return (
        <WalletContext.Provider
            value={{ walletAddress, connected, chainId, chainType, connect, disconnect }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
