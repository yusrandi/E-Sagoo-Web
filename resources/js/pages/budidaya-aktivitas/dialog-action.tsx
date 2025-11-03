import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import aktivitasBudidaya from '@/routes/aktivitas-budidaya';
import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';

import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    currentRow?: AktivitasBudidayaType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reload: () => void;
}

export function DialogAction({ currentRow, open, onOpenChange, reload }: Props) {
    const isEdit = !!currentRow;

    const { data, setData, post, processing, errors, reset, clearErrors, put } = useForm({
        nama_aktivitas: currentRow?.nama_aktivitas || '',
        level: currentRow?.level || 0,
        deskripsi: currentRow?.deskripsi || '',
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
        put(aktivitasBudidaya.update.url({ aktivitas_budidaya: currentRow!.id }), {
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
        post(aktivitasBudidaya.store.url(), {
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
                                    Nama Aktivitas <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    value={data.nama_aktivitas}
                                    onChange={(e) => setData('nama_aktivitas', e.target.value)}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Nama Lokasi Kebun"
                                />
                                <InputError message={errors.nama_aktivitas} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">
                                    Level Kegiatan <span className="text-destructive">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        value={data.level}
                                        onChange={(e) => setData('level', Number(e.target.value))}
                                        type="number"
                                        autoFocus
                                        tabIndex={1}
                                        placeholder="1"
                                        className="" // Memberikan space untuk addon
                                    />
                                </div>
                                <InputError message={errors.level} className="mt-2" />
                            </div>
                            <div className="mt-2 space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">Keterangan Singkat</label>
                                <Textarea
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Keterangan singkat menegenai lokasi kebun"
                                />
                                <InputError message={errors.deskripsi} className="mt-2" />
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
