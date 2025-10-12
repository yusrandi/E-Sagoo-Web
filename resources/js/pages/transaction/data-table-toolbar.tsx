import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TransactionStatusOptions } from '@/types/transaction-type';
import { Table } from '@tanstack/react-table';
import { XIcon } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter Items..."
                    value={(table.getColumn('user')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('user')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('status') && (
                        <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={TransactionStatusOptions} />
                    )}
                </div>
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <XIcon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* <DataTableViewOptions table={table} /> */}
        </div>
    );
}
