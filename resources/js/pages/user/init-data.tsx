import { User } from '@/types/user';

import { getColumns } from './columns';
import { useUsers } from './context';
import { DataTable } from './data-table';

interface InitDataProps {
    users: User[];
}
export default function InitData({ users }: InitDataProps) {
    const { setReloadHandler, setCurrentRow, setOpen } = useUsers();
    return <DataTable columns={getColumns(setOpen, setCurrentRow)} data={users} />;
}
