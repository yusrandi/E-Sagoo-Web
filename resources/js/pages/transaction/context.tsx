import useDialogState from '@/hooks/use-dialog-state';
import { TransactionType } from '@/types/transaction-type';
import { createContext, useContext, useRef, useState } from 'react';

type TransactionsDialogType = 'add' | 'edit' | 'delete' | 'verify';

interface TransactionsContextType {
    open: TransactionsDialogType | null;
    setOpen: (open: TransactionsDialogType | null) => void;
    currentRow: TransactionType | null;
    setCurrentRow: (currentRow: TransactionType | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const TransactionContext = createContext<TransactionsContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function TransactionsProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<TransactionsDialogType>(null);
    const [currentRow, setCurrentRow] = useState<TransactionType | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <TransactionContext
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
        </TransactionContext>
    );
}

export const useTransactions = () => {
    const TransactionsContext = useContext(TransactionContext);

    if (!TransactionsContext) {
        throw new Error('useTransactions has to be used within <TransactionContext>');
    }
    return TransactionsContext;
};
