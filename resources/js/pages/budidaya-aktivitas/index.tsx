import AppLayout from '@/layouts/app-layout';
import aktivitasBudidaya from '@/routes/aktivitas-budidaya';
import { BreadcrumbItem } from '@/types';
import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';
import { Head } from '@inertiajs/react';
import ButtonAdd from './button-add';
import { columns } from './columns';
import AktivitasBudidayasProvider from './context';
import { DataTable } from './data-table';
import { DialogsIndex } from './dialogs-index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aktivitas Budidaya',
        href: aktivitasBudidaya.index.url(),
    },
];
export default function BudidayaAktivitasPage({ datas }: { datas: AktivitasBudidayaType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aktivitas Budidaya" />
            <AktivitasBudidayasProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Data Aktivitas Budidaya</h2>
                            <p className="text-muted-foreground">Kelola data aktivitas budidaya dengan mudah.</p>
                        </div>
                        <ButtonAdd />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <DataTable columns={columns} data={datas} />
                    </div>
                </div>
                <DialogsIndex />
            </AktivitasBudidayasProvider>
        </AppLayout>
    );
}
