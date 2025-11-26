import React from 'react';
import { tokenLogoMap } from '../assets/tokens';

export const TokenLogo = ({ ticker, size = 6 }: { ticker: string, size?: number }) => {
    if (!(ticker in tokenLogoMap)) {
        return <div className="w-6 h-6 bg-gray-200 rounded-full" />;
    }
    return <img src={tokenLogoMap[ticker as keyof typeof tokenLogoMap]} alt={ticker} className={`w-${size} h-${size}`} />;
};