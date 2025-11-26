import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    type ColumnDef,
} from '@tanstack/react-table';
import { useBalances } from '../../hooks/useBalances';
import { useWallet } from '../../state/keplrWallet';
import { TokenLogo } from '../../components/TokenLogo';
import { TokenTicker } from '../../components/TokenTicker';
import { TokenPrice } from '../../components/TokenPrice';
import { usePrices } from '../../hooks/usePrices';
import { Value } from './balance/Value';

type BalanceRow = {
    denom: string;
    amount: number;
    amountRaw: string;
};

const columnHelper = createColumnHelper<BalanceRow>();

export const Balances = () => {
    const { connected } = useWallet();
    const { data: coins, isLoading, isError } = useBalances();
    const { data: prices } = usePrices();
    const [hideSmallBalances, setHideSmallBalances] = useState(false);

    // Filter data before passing to table to avoid constant rerenders
    const filteredCoins = useMemo(() => {
        if (!coins || !hideSmallBalances) return coins || [];
        return coins.filter((coin) => {
            const price = parseFloat(prices?.[coin.denom] ?? '0');
            const value = price * coin.amount;
            return value >= 0.001;
        });
    }, [coins, prices, hideSmallBalances]);

    const columns = useMemo(
        () => [
            columnHelper.accessor('denom', {
                header: 'Token',
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <TokenLogo ticker={info.getValue()} />
                        <TokenTicker ticker={info.getValue()} />
                    </div>
                ),
            }),
            columnHelper.accessor('amount', {
                header: 'Amount',
                cell: (info) => (
                    <span className="text-right">{Number(info.getValue()).toFixed(3)}</span>
                ),
            }),
            columnHelper.display({
                id: 'value',
                header: 'Value',
                cell: (info) => (
                    <Value
                        price={prices?.[info.row.original.denom] ?? '0'}
                        amount={info.row.original.amount}
                    />
                ),
            }),
            columnHelper.display({
                id: 'price',
                header: 'Price',
                cell: (info) => (
                    <TokenPrice price={prices?.[info.row.original.denom] ?? '0'} />
                ),
            }),
        ] as ColumnDef<BalanceRow>[],
        [prices]
    );

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
            <div className="mb-4 flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={hideSmallBalances}
                        onChange={(e) => setHideSmallBalances(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">Hide small balances (&lt; $0.001)</span>
                </label>
            </div>
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
                            <tr key={row.id} className="hover:bg-gray-800">
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
