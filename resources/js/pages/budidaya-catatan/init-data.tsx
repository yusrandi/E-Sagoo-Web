import { SharedData } from '@/types';
import { CatatanBudidayaType } from '@/types/catatan-budidaya';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import { useCatatanBudidayas } from './context';
import { DataTable } from './data-table';

interface Props {
    catatans: CatatanBudidayaType[];
}
export default function InitDataPage({ catatans }: Props) {
    const { setReloadHandler, setCurrentRow, setOpen } = useCatatanBudidayas();
    const [rows, setRows] = useState(catatans);

    const page = usePage<SharedData>();
    const { auth } = page.props;

    useEffect(() => {
        setRows(catatans);
    }, [catatans]);

    useEffect(() => {
        console.log('data changed', catatans);

        setReloadHandler(() => {
            router.reload({
                only: ['catatans'],
            });
        });
    }, [setReloadHandler]);
    return <DataTable columns={getColumns(setOpen, setCurrentRow)} data={catatans} />;
}
