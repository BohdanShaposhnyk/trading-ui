import { TokenPrice } from "@/components/TokenPrice";
import { ColumnDef } from "@tanstack/react-table";
import { Value } from "../Value";
import { TokenLogo } from "@/components/TokenLogo";
import { TokenTicker } from "@/components/TokenTicker";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

type BalanceRow = {
    denom: string;
    amount: number;
    amountRaw: string;
};

export const useBalancesTableColumns = (prices?: Record<string, string>) => {
    const columnHelper = createColumnHelper<BalanceRow>();

    return useMemo(
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
};