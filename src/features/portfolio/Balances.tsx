import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';

import { useBalances } from '../../hooks/useBalances';
import { useWallet } from '../../state/keplrWallet';
import { usePrices } from '../../hooks/usePrices';
import { HideSmall } from './HideSmall';
import { useBalancesTableColumns } from './hooks/useBalancesColumns';

export const Balances = () => {
    const { connected } = useWallet();
    const { data: coins, isLoading, isError } = useBalances();
    const { data: prices } = usePrices();
    const [hideSmallBalances, setHideSmallBalances] = useState(true);

    // Filter data before passing to table to avoid constant rerenders
    const filteredCoins = useMemo(() => {
        if (!coins || !hideSmallBalances) return coins || [];
        return coins.filter((coin) => {
            const price = parseFloat(prices?.[coin.denom] ?? '0');
            const value = price * coin.amount;
            return value >= 0.001;
        });
    }, [coins, prices, hideSmallBalances]);

    const columns = useBalancesTableColumns(prices)

    const table = useReactTable({
        data: filteredCoins,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (!connected) return <div>Connect your wallet to view your balances</div>;
    if (isLoading) return <div>Loading balances...</div>;
    if (isError) return <div>Error loading balances</div>;
    if (!coins || coins.length === 0) return <div>No balances</div>;

    return (
        <div className="w-full">
            <HideSmall hideSmallBalances={hideSmallBalances} setHideSmallBalances={setHideSmallBalances} />
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-left font-semibold text-gray-700"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-foreground/5">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
