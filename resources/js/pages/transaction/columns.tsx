import { TransactionType } from '@/types/transaction-type';
import { ColumnDef } from '@tanstack/react-table';
import { Clock1 } from 'lucide-react';
import { ComboboxStatus } from './combobox-status';

export const columns: ColumnDef<TransactionType>[] = [
    {
        accessorKey: 'created_at',
        header: 'Transaction Date',
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <Clock1 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{row.getValue('created_at')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'user',
        header: 'User',
    },
    {
        accessorKey: 'items_count',
        header: 'Items Count',
    },
    // {
    //     accessorKey: 'status',
    //     header: 'Status',
    //     cell: ({ row }) => {
    //         const status = row.original.status as string;
    //         const badgeColor = TransactionStatus.get(status);
    //         return (
    //             <div className="flex gap-2">
    //                 <Badge variant="outline" className={cn('capitalize', badgeColor)}>
    //                     {status.replace('_', ' ')}
    //                 </Badge>
    //             </div>
    //         );
    //     },
    // },
    {
        accessorKey: 'status',
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const transaction = row.original;

            return (
                <div className="flex justify-end">
                    <ComboboxStatus value={transaction.status} onChange={(val) => {}} transactionId={transaction.id} />
                </div>
            );
        },
    },
];
