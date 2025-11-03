import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import lokasi from '@/routes/lokasi';
import { LokasiKebunType } from '@/types/lokasi-kebun';

import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    currentRow?: LokasiKebunType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reload: () => void;
}

export function DialogAction({ currentRow, open, onOpenChange, reload }: Props) {
    const isEdit = !!currentRow;

    const { data, setData, post, processing, errors, reset, clearErrors, put } = useForm({
        nama_lokasi: currentRow?.nama_lokasi || '',
        luas_lahan: currentRow?.luas_lahan || 0,
        alamat: currentRow?.alamat || '',
        keterangan: currentRow?.keterangan || '',
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ data });
        if (isEdit) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };
    const handleUpdate = async () => {
        put(lokasi.update.url({ lokasi: currentRow!.id }), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
                clearErrors();
                reload();
                toast.success('data updated successfully');
            },
            onError: () => {
                console.log('error');
                toast.error('Failed to update data');
            },
            preserveScroll: true,
            preserveState: true,
            only: ['data', 'errors'],
        });
    };
    const handleCreate = async () => {
        post(lokasi.store.url(), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
                clearErrors();
                reload();
                toast.success('data created successfully');
            },
            onError: (error) => {
                console.log('error', error);
                toast.error('Failed to create data');
            },
            preserveScroll: true,
            preserveState: true,
            only: ['data', 'errors'],
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                reset(); // reset data
                clearErrors(); // hapus semua error
                onOpenChange(state);
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <form id="stadium-form" onSubmit={onSubmit} className="space-y-4">
                    <DialogHeader className="text-left">
                        <DialogTitle>{isEdit ? 'Edit Kategori' : 'Tambah Kategori Baru'}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? 'Perbarui kategori di sini.' : 'Buat kategori baru di sini. '}
                            Klik simpan ketika sudah selesai.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">
                                    Nama Lokasi Kebun <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    value={data.nama_lokasi}
                                    onChange={(e) => setData('nama_lokasi', e.target.value)}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Nama Lokasi Kebun"
                                />
                                <InputError message={errors.nama_lokasi} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">Alamat</label>
                                <Input
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Alamat"
                                />
                                <InputError message={errors.alamat} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">
                                    Luas Lahan <span className="text-destructive">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        value={data.luas_lahan}
                                        onChange={(e) => setData('luas_lahan', Number(e.target.value))}
                                        type="number"
                                        autoFocus
                                        tabIndex={1}
                                        placeholder="200"
                                        className="pr-16" // Memberikan space untuk addon
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        m<sup>2</sup>
                                    </div>
                                </div>
                                <InputError message={errors.luas_lahan} className="mt-2" />
                            </div>
                            <div className="mt-2 space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">Keterangan Singkat</label>
                                <Textarea
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    placeholder="Keterangan singkat menegenai lokasi kebun"
                                />
                                <InputError message={errors.keterangan} className="mt-2" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Simpan</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
