import React from 'react';
import { useWallet } from '../state/keplrWallet';
import { Button } from './ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from './ui/hover-card';
import { usePortfolioValue } from '../hooks/usePortfolioValue';
import { Skeleton } from './ui/skeleton';
import { middleTruncate } from '../utils/format';
import { CopyIcon } from 'lucide-react';
import { Label } from './ui/label';
import { toast } from 'sonner';

export const KeplrButton = () => {
    const { walletAddress, connected, connect, disconnect } = useWallet();
    const { portfolioValue, isLoading, isError } = usePortfolioValue();

    if (!connected) {
        return (
            <Button onClick={() => connect()}>
                Connect Keplr
            </Button>
        );
    }

    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                <Button
                    className="hover:bg-card hover:text-current pointer-events-auto bg-card text-card-foreground cursor-default"
                >
                    {isLoading ? <Skeleton className="w-20 h-4" /> : <span>{portfolioValue} $</span>}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-56 bg-card">
                <div className="space-y-2 align-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group hover:bg-transparent gap-2"
                        onClick={() => {
                            if (!walletAddress) return
                            toast.success('Address copied to clipboard')
                            navigator.clipboard.writeText(walletAddress ?? '')
                        }}
                    >
                        <Label className="text-s text-muted-foreground cursor-pointer group-hover:text-muted-foreground/102">
                            {middleTruncate(walletAddress ?? '')}
                        </Label>
                        <CopyIcon className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground/102" />
                    </Button>
                    <Button
                        onClick={() => disconnect()}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                    >
                        Disconnect
                    </Button>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
