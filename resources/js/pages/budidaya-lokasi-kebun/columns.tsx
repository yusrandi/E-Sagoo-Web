import { LokasiKebunType } from '@/types/lokasi-kebun';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<LokasiKebunType>[] = [
    {
        accessorKey: 'nama_lokasi',
        header: 'Lokasi Budidaya',
    },
    {
        accessorKey: 'luas_lahan',
        header: 'Luas Lahan',
        cell: ({ row }) => {
            const luasLahan = row.original.luas_lahan;
            return (
                <span>
                    {luasLahan} m<sup>2</sup>
                </span>
            );
        },
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
