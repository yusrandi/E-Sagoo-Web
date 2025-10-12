import { CategoryCombobox } from '@/components/category-combobox';
import ImageUpload from '@/components/image-upload';
import InputError from '@/components/input-error';
import TinyMCEEditor from '@/components/TinyMCEEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import product from '@/routes/product';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/category';
import { ProductType } from '@/types/product-type';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: product.create.url(),
    },
];

interface Produk {
    id: string;
    nama: string;
    gambar: (File | string | null)[];
}

interface props {
    categories: Category[];
    productSelected: ProductType | null;
}

interface ProductForm {
    id: number;
    name: string;
    category_id: number | null;
    description: string;
    price: number;
    stock: number;
    existingImages: string[]; // path dari DB
    newImages: File[]; // file baru
    deletedImages: string[]; // path lama yg dihapus
}

export default function CreateProductPage({ categories, productSelected }: props) {
    const [category, setCategory] = useState<Category | null>(productSelected ? productSelected.category : null);
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('0');

    // const [gambar, setGambar] = useState<(File | null)[]>([]);

    const { data, setData, post, processing, errors, reset, clearErrors, put } = useForm<ProductForm>({
        id: productSelected ? productSelected.id : 0,
        name: productSelected ? productSelected.name : '',
        category_id: productSelected ? productSelected.category.id : null,
        description: productSelected ? productSelected.description : '',
        price: productSelected ? productSelected.price : 0,
        stock: productSelected ? productSelected.stock : 0,
        existingImages: productSelected ? productSelected.images.map((i) => i.image_url) : [],
        newImages: [],
        deletedImages: [],
    });

    // Upload file baru
    const handleAddNewImage = (file: File) => {
        setData('newImages', [...data.newImages, file]);
    };

    // Hapus gambar lama (dari DB)
    const handleDeleteExistingImage = (url: string) => {
        setData(
            'existingImages',
            data.existingImages.filter((img) => img !== url),
        );
        setData('deletedImages', [...data.deletedImages, url]);
    };

    // Hapus gambar baru (belum ke DB)
    const handleDeleteNewImage = (index: number) => {
        setData(
            'newImages',
            data.newImages.filter((_, i) => i !== index),
        );
    };

    // formatter ribuan
    const formatNumber = (value: string) => {
        const numeric = value.replace(/\D/g, ''); // hanya angka
        if (!numeric) return '';
        return 'Rp. ' + new Intl.NumberFormat('id-ID').format(Number(numeric));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('data', data);
        // CREATE
        post(product.store.url(), {
            onSuccess: () => {
                console.log('berhasil');

                reset();
                clearErrors();
                toast.success('Success kok kepanggil');
                toast.success(`Product ${productSelected ? 'updated' : 'created'} successfully`);
            },
            onError: (errors) => {
                console.log('error', errors);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <form onSubmit={onSubmit}>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{productSelected ? 'Edit' : 'Create'} Product</h2>
                            <p className="text-muted-foreground">Manage your product with our easy-to-use interface.</p>
                        </div>
                        <div className="flex">
                            <Button type="button" variant="outline" onClick={() => router.visit(product.index.url())} className="mr-2 px-5">
                                Back to List
                            </Button>
                            <Button type="submit" variant="default">
                                Submit Product
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                        {/* Gambar Produk */}
                        <div className="flex flex-col gap-3">
                            <div className="space-y-3 rounded-xl border border-[#E9ECEF] bg-white p-5">
                                <div>
                                    <p className="font-semibold text-[#343A40]">Deskripsi Produk</p>
                                    <p className="text-[12px] font-[400] text-[#6C757D]">
                                        Berikan nama produk yang sesuai dengan produk yang Anda produksi. Pilih kategori yang paling relevan untuk
                                        membantu pelanggan menemukan produk Anda dengan mudah.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Nama Produk</p>
                                        <Input
                                            type="text"
                                            placeholder="Nama Produk"
                                            className="w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-1" />
                                    </div>
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Kategori</p>
                                        <CategoryCombobox
                                            categories={categories}
                                            category={category}
                                            setCategory={(cat: Category | null) => {
                                                setCategory(cat);
                                                setData('category_id', cat?.id ?? 0); // langsung update data form
                                            }}
                                        />
                                        <InputError message={errors.category_id} className="mt-1" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Stok</p>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan jumlah stok"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', Number(e.target.value))}
                                        />
                                        <InputError message={errors.stock} className="mt-2" />
                                    </div>
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Harga</p>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Masukkan harga"
                                            value={price}
                                            // onChange={(e) => setData('price', formatNumber(e.target.value))}
                                            onChange={(e) => {
                                                const formatted = formatNumber(e.target.value);
                                                setPrice(formatted);

                                                // simpan angka asli ke data.price
                                                const numeric = e.target.value.replace(/\D/g, '');
                                                setData('price', Number(numeric));
                                            }}
                                            onBlur={(e) => setPrice(formatNumber(e.target.value))} // pastikan format setelah keluar input
                                        />
                                        <InputError message={errors.price} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 rounded-xl border border-[#E9ECEF] bg-white p-5">
                                <p className="font-semibold text-[#343A40]">Deksipsi Produk</p>
                                <p className="mb-3 text-[12px] font-[400] text-[#6C757D]">Berikan deskripsi singkat tentang produk Anda.</p>

                                <TinyMCEEditor
                                    id={'hasilId'}
                                    name={'hasilName'}
                                    value={data.description}
                                    onChange={(name, content) => setData('description', content)}
                                    height={300}
                                    toolbar="full"
                                />
                            </div>
                            <div className="mt-5 rounded-xl border border-[#E9ECEF] bg-white p-5">
                                <p className="font-semibold text-[#343A40]">Gambar Produk</p>
                                <p className="text-[12px] font-[400] text-[#6C757D]">
                                    Masukan gambar produk yang Anda produksi pada lini ini dari berbagai sisi. Pastikan gambar dalam format{' '}
                                    <span className="text-[#343A40]">JPEG/JPG/PNG</span>.
                                </p>
                                <div className="mt-3 flex flex-col">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-3">
                                            {/* EXISTING IMAGES */}
                                            {data.existingImages?.map((img, idx) => (
                                                <ImageUpload
                                                    key={`existing-${idx}`}
                                                    initialImage={`${window.location.origin}/storage/${img}`}
                                                    onImageUpload={(file) => {
                                                        // kalau kamu mau ganti existing jadi file baru:
                                                        setData('newImages', [...data.newImages, file]);
                                                        setData('deletedImages', [...data.deletedImages, img]); // tandai yang lama dihapus
                                                        setData(
                                                            'existingImages',
                                                            data.existingImages.filter((i) => i !== img),
                                                        );
                                                    }}
                                                    onImageDelete={() => {
                                                        handleDeleteExistingImage(img); // hapus existing
                                                    }}
                                                />
                                            ))}

                                            {/* NEW IMAGES */}
                                            {data.newImages?.map((file, idx) => (
                                                <ImageUpload
                                                    key={`new-${idx}`}
                                                    initialImage={URL.createObjectURL(file)}
                                                    onImageUpload={(newFile) => {
                                                        const copy = [...data.newImages];
                                                        copy[idx] = newFile;
                                                        setData('newImages', copy);
                                                    }}
                                                    onImageDelete={() => handleDeleteNewImage(idx)}
                                                />
                                            ))}

                                            {/* BUTTON ADD */}
                                            {data.existingImages.length + data.newImages.length < 6 && (
                                                <div
                                                    className="flex aspect-[2/1] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-[#8A93A7] p-2 hover:bg-gray-50"
                                                    onClick={() => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = (e: any) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleAddNewImage(file);
                                                        };
                                                        input.click();
                                                    }}
                                                >
                                                    <Plus className="mb-2 size-8 text-[#425B76]" />
                                                    <p className="mb-1 text-[14px] font-bold text-[#425B76]">Tambah gambar</p>
                                                    <p className="text-[12px] font-[400] text-[#ADB5BD]">
                                                        ({data.existingImages.length + data.newImages.length}/6)
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
