import { Switch } from '@/components/ui/switch';
import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const getColumns = (setOpen: (open: any | null) => void, setCurrentRow: (row: User) => void): ColumnDef<User>[] => [
    {
        accessorKey: 'name',
        header: 'Nama Pengguna',
    },
    {
        accessorKey: 'bussiness_name',
        header: 'Nama Usaha',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Hak Akses',
    },
    {
        accessorKey: 'status_verifikasi',
        header: 'Status Verifikasi',
        cell: ({ row }) => {
            const user = row.original;

            return (
                <Switch
                    checked={user.status_verifikasi === 'verified'}
                    onCheckedChange={async (checked) => {
                        setCurrentRow(user);
                        setOpen('verify');
                    }}
                />
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated At',
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
