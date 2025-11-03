import useDialogState from '@/hooks/use-dialog-state';
import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';
import { createContext, useContext, useRef, useState } from 'react';

type AktivitasBudidayasDialogType = 'add' | 'edit' | 'delete';

interface AktivitasBudidayasContextType {
    open: AktivitasBudidayasDialogType | null;
    setOpen: (open: AktivitasBudidayasDialogType | null) => void;
    currentRow: AktivitasBudidayaType | null;
    setCurrentRow: (currentRow: AktivitasBudidayaType | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const AktivitasBudidayaContext = createContext<AktivitasBudidayasContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function AktivitasBudidayasProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<AktivitasBudidayasDialogType>(null);
    const [currentRow, setCurrentRow] = useState<AktivitasBudidayaType | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <AktivitasBudidayaContext
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
        </AktivitasBudidayaContext>
    );
}

export const useAktivitasBudidayas = () => {
    const AktivitasBudidayasContext = useContext(AktivitasBudidayaContext);

    if (!AktivitasBudidayasContext) {
        throw new Error('useAktivitasBudidayas has to be used within <AktivitasBudidayaContext>');
    }
    return AktivitasBudidayasContext;
};
