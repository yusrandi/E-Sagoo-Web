import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import product from '@/routes/product';
import { BreadcrumbItem } from '@/types';
import { ProductType } from '@/types/product-type';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import ProductsProvider from './context';
import ProductData from './data';
import { DialogsIndex } from './dialogs-index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: product.index.url(),
    },
];

export default function ProductPage({ products }: { products: ProductType[] }) {
    const flash = ((usePage().props as any)?.flash as { success?: string; error?: string }) || {};

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ProductsProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
                            <p className="text-muted-foreground">Manage your products with our easy-to-use interface.</p>
                        </div>
                        <Button variant="default" onClick={() => router.visit(product.create.url())}>
                            Add Product
                        </Button>
                    </div>
                    <ProductData products={products} />
                </div>
                <DialogsIndex />
            </ProductsProvider>
        </AppLayout>
    );
}
