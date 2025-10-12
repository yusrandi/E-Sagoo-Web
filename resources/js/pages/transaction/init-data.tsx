import { TransactionType } from '@/types/transaction-type';
import { ShoppingCart } from 'lucide-react';
import { columns } from './columns';
import TransactionsProvider from './context';
import { DataTable } from './data-table';

export default function InitDataPageTransaction({ transactions }: { transactions: TransactionType[] }) {
    return (
        <TransactionsProvider>
            <div className="flex flex-1 flex-col gap-4">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <ShoppingCart className="mb-2 h-12 w-12 text-gray-400" />
                        <h3 className="text-lg font-semibold">Belum ada transaksi</h3>
                        <p className="text-sm">Transaksi akan tampil di sini setelah ditambahkan.</p>
                    </div>
                ) : (
                    <DataTable columns={columns} data={transactions} />
                )}
            </div>
        </TransactionsProvider>
    );
}
