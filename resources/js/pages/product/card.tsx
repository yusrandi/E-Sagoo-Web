import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import product from '@/routes/product';
import { ProductType } from '@/types/product-type';
import { router } from '@inertiajs/react';
import { CheckCircle, Clock, Edit2Icon, EyeIcon, Trash2Icon, XCircle } from 'lucide-react';
import { useProducts } from './context';

export default function CardProduct({ data }: { data: ProductType }) {
    const { setOpen, setCurrentRow } = useProducts();
    return (
        <>
            <Card className="w-full gap-0 py-0 shadow-none">
                <CardContent className="p-0">
                    <div className="relative aspect-[3/2] rounded-lg border-y bg-muted">
                        {data.image?.image_url && (
                            <img
                                src={`${window.location.origin}/storage/${data?.image?.image_url ?? '/placeholder.png'}`}
                                alt={data.name}
                                className="h-full w-full rounded-t-lg object-cover"
                            />
                        )}
                        {/* === STATUS BADGE === */}
                        <div className="absolute top-2 right-2">
                            {data.status_verifikasi === 'pending' && (
                                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                    <Clock className="h-3 w-3" />
                                    Menunggu Verifikasi
                                </span>
                            )}
                            {data.status_verifikasi === 'verified' && (
                                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    <CheckCircle className="h-3 w-3" />
                                    Terverifikasi
                                </span>
                            )}
                            {data.status_verifikasi === 'rejected' && (
                                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                    <XCircle className="h-3 w-3" />
                                    Ditolak
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="px-3 py-3">
                        <h2 className="font-semibold">{data.name}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{data.category.name}.</p>
                    </div>

                    <div className="flex flex-row items-center justify-between px-3 py-3">
                        <h1 className="text-xl font-semibold">{formatRupiah(data.price)}</h1>
                        <h2 className="text-muted-foreground">{data.stock}</h2>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2 border-t px-2 py-2! pb-0">
                    <Button variant="ghost" className="shrink-0 grow bg-primary text-white">
                        <EyeIcon /> <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.visit(product.edit.url({ product: data.id }))}
                        className="shrink-0 grow text-muted-foreground hover:bg-blue-100"
                    >
                        <Edit2Icon /> <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setCurrentRow(data);
                            setOpen('delete');
                        }}
                        className="shrink-0 grow text-muted-foreground hover:bg-red-100"
                    >
                        <Trash2Icon />
                        <span className="hidden sm:inline">Delete</span>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
