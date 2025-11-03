import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<AktivitasBudidayaType>[] = [
    {
        accessorKey: 'nama_aktivitas',
        header: 'Aktivitas Budidaya',
    },
    {
        accessorKey: 'level',
        header: 'Level',
    },
    {
        accessorKey: 'deskripsi',
        header: 'Deskripsi',
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
