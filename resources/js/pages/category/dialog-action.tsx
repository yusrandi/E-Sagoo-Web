import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import category from '@/routes/category';

import { Category } from '@/types/category';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    currentRow?: Category;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reload: () => void;
}

export function DialogAction({ currentRow, open, onOpenChange, reload }: Props) {
    const isEdit = !!currentRow;

    const { data, setData, post, processing, errors, reset, clearErrors, put } = useForm({
        name: currentRow?.name || '',
        description: currentRow?.description || '',
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
        put(category.update.url({ category: currentRow! }), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
                clearErrors();
                reload();
                toast.success('Category updated successfully');
            },
            onError: () => {
                console.log('error');
                toast.error('Failed to update category');
            },
            preserveScroll: true,
            preserveState: true,
            only: ['data', 'errors'],
        });
    };
    const handleCreate = async () => {
        post(category.store.url(), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
                clearErrors();
                reload();
                toast.success('Category created successfully');
            },
            onError: () => {
                console.log('error');
                toast.error('Failed to create category');
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
                                    Nama Kategori <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Jenis sagu olahan atau bahan baku"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-2 space-y-2">
                                <label className="block text-sm font-medium text-muted-foreground">Deskripsi Singkat</label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat mengenai jenisnya"
                                />
                                <InputError message={errors.description} className="mt-2" />
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
