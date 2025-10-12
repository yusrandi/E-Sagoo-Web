import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/confirm-dialog';
import category from '@/routes/category';
import { Category } from '@/types/category';
import { router } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: Category;
    reload: () => void;
}

export function DialogDelete({ open, onOpenChange, currentRow, reload }: Props) {
    const [value, setValue] = useState('');

    const handleDelete = async () => {
        if (value.trim() !== currentRow.name) return;
        router.delete(category.destroy.url({ category: currentRow }), {
            onSuccess: () => {
                console.log('Category deleted');
                toast.success('Category deleted successfully');
                reload(); // dari context untuk refresh
                onOpenChange(false);
            },
            onError: (errors) => {
                toast.error('Failed to delete category');
                console.error(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            disabled={value.trim() !== currentRow.name}
            title={
                <span className="text-destructive">
                    <AlertTriangle className="mr-1 inline-block stroke-destructive" size={18} /> Delete Category
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Are you sure you want to delete <span className="font-bold">{currentRow.name}</span>?
                        <br />
                        This action will permanently remove the category from the system. This cannot be undone.
                    </p>

                    <Label className="my-2">
                        Category name :
                        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter category name to confirm deletion." />
                    </Label>

                    <p className="mb-2"></p>

                    <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>Please be carefull, this operation can not be rolled back.</AlertDescription>
                    </Alert>
                </div>
            }
            confirmText="Delete"
            destructive
        />
    );
}
