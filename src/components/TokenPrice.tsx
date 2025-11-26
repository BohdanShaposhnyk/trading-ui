import React from 'react';

export const TokenPrice = ({ price }: { price: string }) => {
    return <div>{parseFloat(price).toFixed(2)} $</div>;
};