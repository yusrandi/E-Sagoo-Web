import { AktivitasCombobox } from '@/components/aktivitas-combobox';
import InputError from '@/components/input-error';
import { LokasiCombobox } from '@/components/lokasi-combobox';
import TinyMCEEditor from '@/components/TinyMCEEditor';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import catatanBudidaya from '@/routes/catatan-budidaya';
import { BreadcrumbItem } from '@/types';
import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';
import { CatatanBudidayaType } from '@/types/catatan-budidaya';
import { LokasiKebunType } from '@/types/lokasi-kebun';
import { User } from '@/types/user';
import { Head, router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Catatan Budidaya',
        href: catatanBudidaya.create.url(),
    },
];

interface props {
    lokasis: LokasiKebunType[];
    aktivitases: AktivitasBudidayaType[];
    itemSelected: CatatanBudidayaType | null;
    user: User;
}

interface CatatanBudidayaForm {
    id: number;
    lokasi_id: number;
    aktivitas_id: number;
    user_id: number;
    tanggal_kegiatan: string | null;
    bahan_penggunaan: string | null;
    alat_digunakan: string | null;
    jumlah_petugas: number | null;
    kendala_catatan: string | null;
    biaya: number | null;
    deskripsi_kegiatan: string | null;
}

export default function CreateCatatanBudidayaPage({ lokasis, aktivitases, itemSelected, user }: props) {
    const [lokasi, setLokasi] = useState<LokasiKebunType | null>(itemSelected ? itemSelected.lokasi : null);
    const [aktivitas, setAktivitas] = useState<AktivitasBudidayaType | null>(itemSelected ? itemSelected.aktivitas : null);
    const [biaya, setBiaya] = useState('0');
    const [jumlahPekerja, setJumlahPekerja] = useState('');

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const { data, setData, post, processing, errors, reset, clearErrors, put } = useForm<CatatanBudidayaForm>({
        id: itemSelected ? itemSelected.id : 0,
        lokasi_id: itemSelected ? itemSelected.lokasi.id : 0,
        aktivitas_id: itemSelected ? itemSelected.aktivitas.id : 0,
        user_id: itemSelected ? itemSelected.user.id : user.id,
        tanggal_kegiatan: itemSelected ? itemSelected.tanggal_kegiatan : null,
        bahan_penggunaan: itemSelected ? itemSelected.bahan_penggunaan : null,
        alat_digunakan: itemSelected ? itemSelected.alat_digunakan : null,
        jumlah_petugas: itemSelected ? itemSelected.jumlah_petugas : null,
        kendala_catatan: itemSelected ? itemSelected.kendala_catatan : null,
        biaya: itemSelected ? itemSelected.biaya : null,
        deskripsi_kegiatan: itemSelected ? itemSelected.deskripsi_kegiatan : null,
    });

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
        post(catatanBudidaya.store.url(), {
            onSuccess: () => {
                console.log('berhasil');

                reset();
                clearErrors();
                // toast.success('Success kok kepanggil');
                toast.success(`CatatanBudidaya ${itemSelected ? 'updated' : 'created'} successfully`);
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
                            <h2 className="text-2xl font-bold tracking-tight">{itemSelected ? 'Edit' : 'Create'} Catatan Budidaya</h2>
                            <p className="text-muted-foreground">Manage your budidaya with our easy-to-use interface.</p>
                        </div>
                        <div className="flex">
                            <Button type="button" variant="outline" onClick={() => router.visit(catatanBudidaya.index.url())} className="mr-2 px-5">
                                Back to List
                            </Button>
                            <Button type="submit" variant="default">
                                Submit Catatan Budidaya
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="space-y-3 rounded-xl border border-[#E9ECEF] bg-white p-5">
                                <div>
                                    <p className="font-semibold text-[#343A40]">Deskripsi Kegiatan Budidaya</p>
                                    <p className="text-[12px] font-[400] text-[#6C757D]">
                                        Awasi aktivitas budidaya dari awal hingga panen. Dengan pencatatan yang terstruktur, Anda dapat menganalisis
                                        tren, meningkatkan kualitas produk, dan mencapai hasil budidaya yang lebih konsisten.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Tanggal Kegiatan</p>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                                                    {date ? date.toLocaleDateString() : 'Select date'}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    // captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        if (!date) return;
                                                        setDate(date);
                                                        setData('tanggal_kegiatan', format(date, 'yyyy-MM-dd'));
                                                        setOpen(false);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.tanggal_kegiatan} className="mt-1" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Lokasi Budidaya</p>
                                        <LokasiCombobox
                                            lokasis={lokasis}
                                            lokasi={lokasi}
                                            setLokasi={(lok: LokasiKebunType | null) => {
                                                setLokasi(lok);
                                                setData('lokasi_id', lok?.id ?? 0); // langsung update data form
                                            }}
                                        />
                                        <InputError message={errors.lokasi_id} className="mt-1" />
                                    </div>
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Level Aktivitas Kegiatan</p>
                                        <AktivitasCombobox
                                            aktivitases={aktivitases}
                                            aktivitas={aktivitas}
                                            setAktivitas={(akt: AktivitasBudidayaType | null) => {
                                                setAktivitas(akt);
                                                setData('aktivitas_id', akt?.id ?? 0); // langsung update data form
                                            }}
                                        />
                                        <InputError message={errors.lokasi_id} className="mt-1" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Bahan Penggunaan</p>
                                        <Input
                                            type="text"
                                            placeholder="Masukkan bahan penggunaan"
                                            className="w-full"
                                            value={data.bahan_penggunaan ?? ''}
                                            onChange={(e) => setData('bahan_penggunaan', e.target.value)}
                                        />
                                        <InputError message={errors.bahan_penggunaan} className="mt-1" />
                                    </div>
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Alat Digunakan</p>
                                        <Input
                                            type="text"
                                            placeholder="Masukkan alat digunakan"
                                            className="w-full"
                                            value={data.alat_digunakan ?? ''}
                                            onChange={(e) => setData('alat_digunakan', e.target.value)}
                                        />
                                        <InputError message={errors.alat_digunakan} className="mt-1" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Jumlah Petugas</p>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan jumlah petugas"
                                            value={data.jumlah_petugas ?? 0}
                                            onChange={(e) => setData('jumlah_petugas', Number(e.target.value))}
                                        />
                                        <InputError message={errors.jumlah_petugas} className="mt-2" />
                                    </div>
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Biaya Kegiatan</p>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Masukkan harga"
                                            value={biaya}
                                            // onChange={(e) => setData('price', formatNumber(e.target.value))}
                                            onChange={(e) => {
                                                const formatted = formatNumber(e.target.value);
                                                setBiaya(formatted);

                                                // simpan angka asli ke data.price
                                                const numeric = e.target.value.replace(/\D/g, '');
                                                setData('biaya', Number(numeric));
                                            }}
                                            onBlur={(e) => setBiaya(formatNumber(e.target.value))} // pastikan format setelah keluar input
                                        />
                                        <InputError message={errors.biaya} className="mt-2" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-[4px]">
                                        <p className="font-semibold text-[#343A40]">Kendala Catatan</p>
                                        <Input
                                            type="text"
                                            placeholder="Masukkan kendala catatan"
                                            className="w-full"
                                            value={data.kendala_catatan ?? ''}
                                            onChange={(e) => setData('kendala_catatan', e.target.value)}
                                        />
                                        <InputError message={errors.kendala_catatan} className="mt-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 rounded-xl border border-[#E9ECEF] bg-white p-5">
                                <p className="font-semibold text-[#343A40]">Deksipsi Kegiatan</p>
                                <p className="mb-3 text-[12px] font-[400] text-[#6C757D]">
                                    Berikan deskripsi singkat tentang kegiatan budidaya anda.
                                </p>

                                <TinyMCEEditor
                                    id={'hasilId'}
                                    name={'hasilName'}
                                    value={data.deskripsi_kegiatan ?? ''}
                                    onChange={(name, content) => setData('deskripsi_kegiatan', content)}
                                    height={300}
                                    toolbar="full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
