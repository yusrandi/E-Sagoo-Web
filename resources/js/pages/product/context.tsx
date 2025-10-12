import useDialogState from '@/hooks/use-dialog-state';
import { ProductType } from '@/types/product-type';
import { createContext, useContext, useRef, useState } from 'react';

type ProductsDialogType = 'add' | 'edit' | 'delete' | 'verify';

interface ProductsContextType {
    open: ProductsDialogType | null;
    setOpen: (open: ProductsDialogType | null) => void;
    currentRow: ProductType | null;
    setCurrentRow: (currentRow: ProductType | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const ProductContext = createContext<ProductsContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function ProductsProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<ProductsDialogType>(null);
    const [currentRow, setCurrentRow] = useState<ProductType | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <ProductContext
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
        </ProductContext>
    );
}

export const useProducts = () => {
    const ProductsContext = useContext(ProductContext);

    if (!ProductsContext) {
        throw new Error('useProducts has to be used within <ProductContext>');
    }
    return ProductsContext;
};
