import { ConfirmDialog } from '@/components/confirm-dialog';
import { useProducts } from './context';
import { DialogDelete } from './dialog-delete';

export function DialogsIndex() {
    const { open, setOpen, currentRow, setCurrentRow, reload } = useProducts();
    return (
        <>
            {/* <DialogAction key="user-add" open={open === 'add'} onOpenChange={() => setOpen('add')} reload={reload} /> */}

            {currentRow && (
                <>
                    {/* <DialogAction
                        key={`user-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                        reload={reload}
                    /> */}

                    <DialogDelete
                        key={`user-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                        reload={reload}
                    />
                    <ConfirmDialog
                        key="task-verify"
                        destructive
                        open={open === 'verify'}
                        onOpenChange={() => {
                            setOpen('verify');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        handleConfirm={async () => {
                            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
                            await fetch(`/product/${currentRow.id}/verify`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': token,
                                },
                                body: JSON.stringify({
                                    status_verifikasi: currentRow.status_verifikasi === 'pending' ? 'verified' : 'pending',
                                }),
                            });
                            setOpen(null);
                            setCurrentRow(null);
                            reload();
                        }}
                        className="max-w-md"
                        title={`Konfirmasi Verifikasi?`}
                        desc={
                            <>
                                Apakah Anda yakin ingin memverifikasi produk <strong>{currentRow.name}</strong>? <br />
                                Setelah diverifikasi, produk ini akan ditampilkan sebagai produk yang sudah disetujui.
                            </>
                        }
                        confirmText="Verify"
                    />
                </>
            )}
        </>
    );
}
