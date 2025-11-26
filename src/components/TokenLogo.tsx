import React from 'react';
import { tokenMap } from '../assets/tokens';

export const TokenLogo = ({ ticker, size = 6 }: { ticker: string, size?: number }) => {
    if (!(ticker in tokenMap)) {
        return <div className="w-6 h-6 bg-gray-200 rounded-full" />;
    }
    return <img src={tokenMap[ticker as keyof typeof tokenMap].img} alt={ticker} className={`w-${size} h-${size}`} />;
};