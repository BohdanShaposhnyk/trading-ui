import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type HideSmallProps = {
    hideSmallBalances: boolean;
    setHideSmallBalances: (hideSmallBalances: boolean) => void;
}

export const HideSmall = ({ hideSmallBalances, setHideSmallBalances }: HideSmallProps) => {
    return (
        <div className="mb-4 flex items-center gap-3">
            <Switch
                id="hide-small-balances"
                checked={hideSmallBalances}
                onCheckedChange={setHideSmallBalances}
            />
            <Label
                htmlFor="hide-small-balances"
                className="text-sm text-muted-foreground cursor-pointer"
            >
                Hide small balances (&lt; $0.001)
            </Label>
        </div>
    );
};