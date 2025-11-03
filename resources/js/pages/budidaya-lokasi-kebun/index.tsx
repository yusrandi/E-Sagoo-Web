import AppLayout from '@/layouts/app-layout';
import lokasi from '@/routes/lokasi';
import { BreadcrumbItem } from '@/types';
import { LokasiKebunType } from '@/types/lokasi-kebun';
import { Head } from '@inertiajs/react';
import ButtonAdd from './button-add';
import { columns } from './columns';
import LokasiKebunsProvider from './context';
import { DataTable } from './data-table';
import { DialogsIndex } from './dialogs-index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lokasi Kebun',
        href: lokasi.index.url(),
    },
];
export default function BudidayaLokasiKebun({ lokasis }: { lokasis: LokasiKebunType[] }) {
    console.log(lokasis);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lokasi Kebun" />
            <LokasiKebunsProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Data Lokasi Kebun</h2>
                            <p className="text-muted-foreground">Kelola data lokasi kebun dengan mudah.</p>
                        </div>
                        <ButtonAdd />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <DataTable columns={columns} data={lokasis} />
                    </div>
                </div>
                <DialogsIndex />
            </LokasiKebunsProvider>
        </AppLayout>
    );
}
