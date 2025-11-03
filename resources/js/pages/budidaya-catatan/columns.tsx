import { CatatanBudidayaType } from '@/types/catatan-budidaya';
import { ColumnDef } from '@tanstack/react-table';
import { Clock1 } from 'lucide-react';
import { DataTableRowActions } from './data-table-row-actions';

export const getColumns = (
    setOpen: (open: any | null) => void,
    setCurrentRow: (row: CatatanBudidayaType) => void,
): ColumnDef<CatatanBudidayaType>[] => [
    {
        accessorKey: 'tanggal_kegiatan',
        header: 'Tanggal Kegiatan',
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[120px] items-center">
                    <Clock1 className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{row.getValue('tanggal_kegiatan')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'kebun',
        header: 'Lokasi Budidaya',
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[120px] items-center">
                    <span className="truncate">{row.getValue('kebun')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'status_aktivitas',
        header: 'Status Aktivitas',
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[120px] items-center">
                    <span className="truncate">{row.getValue('status_aktivitas')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'petani',
        header: 'Nama Petani',
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[120px] items-center">
                    <span className="truncate">{row.getValue('petani')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'bahan_penggunaan',
        header: 'Bahan Penggunaan',
    },
    {
        accessorKey: 'alat_digunakan',
        header: 'Alat Digunakan',
    },
    {
        accessorKey: 'biaya',
        header: 'Biaya',
    },
    {
        accessorKey: 'jumlah_petugas',
        header: 'Jumlah Petugas',
    },
    {
        accessorKey: 'kendala_catatan',
        header: 'Kendala Catatan',
    },
    {
        accessorKey: 'deskripsi_kegiatan',
        header: 'Deskripsi Kegiatan',
    },

    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
