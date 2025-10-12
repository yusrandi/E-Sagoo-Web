import useDialogState from '@/hooks/use-dialog-state';
import { User } from '@/types/user';
import { createContext, useContext, useRef, useState } from 'react';

type UsersDialogType = 'add' | 'edit' | 'delete' | 'verify';

interface UsersContextType {
    open: UsersDialogType | null;
    setOpen: (open: UsersDialogType | null) => void;
    currentRow: User | null;
    setCurrentRow: (currentRow: User | null) => void;
    setReloadHandler: (fn: () => void) => void;
    reload: () => void;
}

const UserContext = createContext<UsersContextType | null>(null);

interface Props {
    children: React.ReactNode;
}
export default function UsersProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<UsersDialogType>(null);
    const [currentRow, setCurrentRow] = useState<User | null>(null);

    const reloadRef = useRef<() => void>(() => {});

    return (
        <UserContext
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
        </UserContext>
    );
}

export const useUsers = () => {
    const UsersContext = useContext(UserContext);

    if (!UsersContext) {
        throw new Error('useUsers has to be used within <UserContext>');
    }
    return UsersContext;
};
