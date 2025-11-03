import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import catatanBudidaya from '@/routes/catatan-budidaya';
import { BreadcrumbItem } from '@/types';
import { CatatanBudidayaType } from '@/types/catatan-budidaya';
import { Head, router } from '@inertiajs/react';
import CatatanBudidayasProvider from './context';
import { DialogsIndex } from './dialogs-index';
import InitDataPage from './init-data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catatan Budidaya',
        href: catatanBudidaya.index.url(),
    },
];
export default function BudidayaCatatanPage({ catatans }: { catatans: CatatanBudidayaType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lokasi Kebun" />
            <CatatanBudidayasProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Catatan Budidaya List</h2>
                            <p className="text-muted-foreground">Manage your budidaya with our easy-to-use interface.</p>
                        </div>
                        <Button variant="default" onClick={() => router.visit(catatanBudidaya.create.url())}>
                            Tambah Catatan Budidaya
                        </Button>
                    </div>
                    <InitDataPage catatans={catatans} />
                </div>
                <DialogsIndex />
            </CatatanBudidayasProvider>
        </AppLayout>
    );
}
