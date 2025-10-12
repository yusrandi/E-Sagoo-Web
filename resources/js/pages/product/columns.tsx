import { Switch } from '@/components/ui/switch';
import { ProductType } from '@/types/product-type';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const getColumns = (setOpen: (open: any | null) => void, setCurrentRow: (row: ProductType) => void): ColumnDef<ProductType>[] => [
    {
        accessorKey: 'user',
        header: 'Nama Penjual',
    },
    {
        accessorKey: 'bussiness_name',
        header: 'Nama Usaha',
    },
    {
        accessorKey: 'name',
        header: 'Nama Produk',
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex items-center gap-2">
                    <img
                        src={`${window.location.origin}/storage/${product?.image?.image_url ?? '/placeholder.png'}`}
                        alt={product.name}
                        className="h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Kategori',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        accessorKey: 'price',
        header: 'Price',
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
    // {
    //     accessorKey: 'created_at',
    //     header: 'Created At',
    // },
    // {
    //     accessorKey: 'updated_at',
    //     header: 'Updated At',
    // },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
