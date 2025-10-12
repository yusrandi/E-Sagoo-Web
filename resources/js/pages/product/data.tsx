import { SharedData } from '@/types';
import { ProductType } from '@/types/product-type';
import { router, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardProduct from './card';
import { getColumns } from './columns';
import { useProducts } from './context';
import { DataTable } from './data-table';

interface Props {
    products: ProductType[];
}
export default function ProductData({ products }: Props) {
    const { setReloadHandler, setCurrentRow, setOpen } = useProducts();
    const [rows, setRows] = useState(products);

    const page = usePage<SharedData>();
    const { auth } = page.props;

    useEffect(() => {
        setRows(products);
    }, [products]);

    useEffect(() => {
        console.log('data changed', products);

        setReloadHandler(() => {
            router.reload({
                only: ['products'],
            });
        });
    }, [setReloadHandler]);
    return (
        <div className="flex flex-1 flex-col gap-4">
            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <ShoppingCart className="mb-2 h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-semibold">Belum ada produk</h3>
                    <p className="text-sm">Produk akan tampil di sini setelah ditambahkan.</p>
                </div>
            ) : (
                <>
                    {/* === Jika role admin === */}
                    {auth.user.role === 'admin' ? (
                        <DataTable columns={getColumns(setOpen, setCurrentRow)} data={products} />
                    ) : (
                        /* === Jika role user biasa === */
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <CardProduct key={product.id} data={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
