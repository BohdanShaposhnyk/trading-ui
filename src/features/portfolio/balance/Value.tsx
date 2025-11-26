import React from 'react';

export const Value = ({ price, amount }: { price: string, amount: number }) => {
    const value = parseFloat(price) * amount;
    return <div>{value.toFixed(2)} $</div>;
};