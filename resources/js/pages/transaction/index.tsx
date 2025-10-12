import AppLayout from '@/layouts/app-layout';
import transaction from '@/routes/transaction';
import { BreadcrumbItem } from '@/types';
import { TransactionType } from '@/types/transaction-type';
import { Head } from '@inertiajs/react';
import InitDataPageTransaction from './init-data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaction',
        href: transaction.index.url(),
    },
];
export default function TransactionPage({ transactions }: { transactions: TransactionType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Transaction List</h2>
                        <p className="text-muted-foreground">Manage your transactions with our easy-to-use interface.</p>
                    </div>
                </div>

                <InitDataPageTransaction transactions={transactions} />
            </div>
        </AppLayout>
    );
}
