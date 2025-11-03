import useDialogState from '@/hooks/use-dialog-state';
import { CatatanBudidayaType } from '@/types/catatan-budidaya';
import { createContext, useContext, useRef, useState } from 'react';

type CatatanBudidayasDialogType = 'add' | 'edit' | 'delete';

interface CatatanBudidayasContextType {
    open: CatatanBudidayasDialogType | null;
    setOpen: (open: CatatanBudidayasDialogType | null) => void;
    currentRow: CatatanBudidayaType | null;
    setCurrentRow: (currentRow: CatatanBudidayaType | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const CatatanBudidayaContext = createContext<CatatanBudidayasContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function CatatanBudidayasProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<CatatanBudidayasDialogType>(null);
    const [currentRow, setCurrentRow] = useState<CatatanBudidayaType | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <CatatanBudidayaContext
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
        </CatatanBudidayaContext>
    );
}

export const useCatatanBudidayas = () => {
    const CatatanBudidayasContext = useContext(CatatanBudidayaContext);

    if (!CatatanBudidayasContext) {
        throw new Error('useCatatanBudidayas has to be used within <CatatanBudidayaContext>');
    }
    return CatatanBudidayasContext;
};
