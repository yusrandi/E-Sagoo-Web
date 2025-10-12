import { useCategorys } from './context';
import { DialogAction } from './dialog-action';
import { DialogDelete } from './dialog-delete';

export function DialogsIndex() {
    const { open, setOpen, currentRow, setCurrentRow, reload } = useCategorys();
    return (
        <>
            <DialogAction key="user-add" open={open === 'add'} onOpenChange={() => setOpen('add')} reload={reload} />

            {currentRow && (
                <>
                    <DialogAction
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
                    />

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
                </>
            )}
        </>
    );
}
