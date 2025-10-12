import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import category from '@/routes/category';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/category';
import { Head } from '@inertiajs/react';
import ButtonAdd from './button-add';
import { columns } from './columns';
import CategorysProvider from './context';
import { DataTable } from './data-table';
import { DialogsIndex } from './dialogs-index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: category.index.url(),
    },
];

export default function CategoryPage({ categories }: { categories: Category[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <CategorysProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Data Kategori</h2>
                            <p className="text-muted-foreground">Kelola data kategori dengan mudah.</p>
                        </div>
                        <ButtonAdd />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        {categories.length === 0 ? (
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        ) : (
                            <DataTable columns={columns} data={categories} />
                        )}
                    </div>
                </div>
                <DialogsIndex />
            </CategorysProvider>
        </AppLayout>
    );
}
