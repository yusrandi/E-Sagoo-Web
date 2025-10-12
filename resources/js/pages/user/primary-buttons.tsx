import { Button } from '@/components/ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useUsers } from './context';

export function UserPrimaryButtons() {
    const { setOpen } = useUsers();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('add')}>
                <span>Add User</span> <UserPlusIcon size={18} />
            </Button>
        </div>
    );
}
