import { ConfirmDialog } from '@/components/confirm-dialog';
import { useUsers } from './context';
import { UserDrawer } from './drawer';

export function UserDialogs() {
    const { open, setOpen, currentRow, setCurrentRow, reload } = useUsers();
    return (
        <>
            {/* <CoachsActionDialog
        key='coach-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      /> */}
            <UserDrawer key="task-create" open={open === 'add'} onOpenChange={() => setOpen('add')} reload={reload} />

            {currentRow && (
                <>
                    {/* <CoachsActionDialog
            key={`coach-edit-${currentRow.coach}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> */}
                    <UserDrawer
                        key={`task-update-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                        reload={reload}
                    />

                    {/* <CoachsDeleteDialog
            key={`coach-delete-${currentRow.coach}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> */}

                    <ConfirmDialog
                        key="task-delete"
                        destructive
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        handleConfirm={async () => {
                            setOpen(null);

                            setCurrentRow(null);
                        }}
                        className="max-w-md"
                        title={`Delete this user: ${currentRow.name} ?`}
                        desc={
                            <>
                                You are about to delete the user with the name <strong>{currentRow.name}</strong>. <br />
                                This action cannot be undone.
                            </>
                        }
                        confirmText="Delete"
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
                            await fetch(`/users/${currentRow.id}/verify`, {
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
                        title={`Konfirmasi Verifikasi: ${currentRow.name} ?`}
                        desc={
                            <>
                                Apakah Anda yakin ingin memverifikasi user bernama <strong>{currentRow.name}</strong>? <br />
                                Proses ini bersifat permanen dan tidak dapat dibatalkan.
                            </>
                        }
                        confirmText="Verify"
                    />
                </>
            )}
        </>
    );
}
