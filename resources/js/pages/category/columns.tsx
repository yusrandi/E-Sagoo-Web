import { Category } from '@/types/category';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Category Name',
    },
    {
        accessorKey: 'products_count',
        header: 'Number of Products',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
