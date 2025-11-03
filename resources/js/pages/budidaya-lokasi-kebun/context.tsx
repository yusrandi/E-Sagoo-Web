import useDialogState from '@/hooks/use-dialog-state';
import { LokasiKebunType } from '@/types/lokasi-kebun';
import { createContext, useContext, useRef, useState } from 'react';

type LokasiKebunsDialogType = 'add' | 'edit' | 'delete';

interface LokasiKebunsContextType {
    open: LokasiKebunsDialogType | null;
    setOpen: (open: LokasiKebunsDialogType | null) => void;
    currentRow: LokasiKebunType | null;
    setCurrentRow: (currentRow: LokasiKebunType | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const LokasiKebunContext = createContext<LokasiKebunsContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function LokasiKebunsProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<LokasiKebunsDialogType>(null);
    const [currentRow, setCurrentRow] = useState<LokasiKebunType | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <LokasiKebunContext
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
        </LokasiKebunContext>
    );
}

export const useLokasiKebuns = () => {
    const LokasiKebunsContext = useContext(LokasiKebunContext);

    if (!LokasiKebunsContext) {
        throw new Error('useLokasiKebuns has to be used within <LokasiKebunContext>');
    }
    return LokasiKebunsContext;
};
