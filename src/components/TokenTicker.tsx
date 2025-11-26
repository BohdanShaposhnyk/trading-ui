import React from 'react';
import { tokenMap } from '../assets/tokens';

export const TokenTicker = ({ ticker }: { ticker: string }) => {
    if (!(ticker in tokenMap)) {
        return <div>{ticker}</div>;
    }
    return <div>{tokenMap[ticker as keyof typeof tokenMap].ticker}</div>;
};