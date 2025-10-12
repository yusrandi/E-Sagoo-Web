import useDialogState from '@/hooks/use-dialog-state';
import { Category } from '@/types/category';
import { createContext, useContext, useRef, useState } from 'react';

type CategorysDialogType = 'add' | 'edit' | 'delete';

interface CategorysContextType {
    open: CategorysDialogType | null;
    setOpen: (open: CategorysDialogType | null) => void;
    currentRow: Category | null;
    setCurrentRow: (currentRow: Category | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const CategoryContext = createContext<CategorysContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function CategorysProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<CategorysDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Category | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <CategoryContext
            value={{
                open,
                setOpen,
                currentRow,
                setCurrentRow,
                reload: () => reloadRef.current(), // panggil fungsi dari ref
                setReloadHandler: (fn: () => void) => {
                    reloadRef.current = fn; // simpan fungsi asli
                },
            }}
        >
            {children}
        </CategoryContext>
    );
}

export const useCategorys = () => {
    const CategorysContext = useContext(CategoryContext);

    if (!CategorysContext) {
        throw new Error('useCategorys has to be used within <CategoryContext>');
    }
    return CategorysContext;
};
