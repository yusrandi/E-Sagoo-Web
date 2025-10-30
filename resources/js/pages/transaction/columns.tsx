import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TransactionType } from '@/types/transaction-type';
import { ColumnDef } from '@tanstack/react-table';
import { Clock1, FileTextIcon } from 'lucide-react';
import { ComboboxStatus } from './combobox-status';

export const columns: ColumnDef<TransactionType>[] = [
    {
        accessorKey: 'created_at',
        header: 'Transaction Date',
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[120px] items-center">
                    <Clock1 className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{row.getValue('created_at')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'user',
        header: 'Buyer Name',
    },
    {
        accessorKey: 'shop',
        header: 'Seller Shop',
    },

    {
        accessorKey: 'items_count',
        header: 'Items Count',
        cell: ({ row }) => {
            return <div className="w-32 max-w-32 min-w-32 text-center">{row.getValue('items_count')}</div>;
        },
    },

    {
        accessorKey: 'payment_slip',
        header: 'Payment Slip',
        cell: ({ row }) => {
            const paymentSlip = row.getValue('payment_slip') as string | null;

            return (
                <div className="w-16 max-w-16 min-w-16 text-center">
                    {paymentSlip ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FileTextIcon
                                        className="mx-auto h-5 cursor-pointer text-blue-600 transition-colors hover:text-blue-800"
                                        onClick={() => {
                                            window.open(`${window.location.origin}/storage/${paymentSlip}`, '_blank');
                                        }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Lihat bukti pembayaran</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className="text-gray-400">-</span>
                    )}
                </div>
            );
        },
    },

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
