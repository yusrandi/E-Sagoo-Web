import AppLayout from '@/layouts/app-layout';

import user from '@/routes/user';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import UsersProvider from './context';
import { UserDialogs } from './dialogs';
import InitData from './init-data';
import { UserPrimaryButtons } from './primary-buttons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: user.index.url(),
    },
];

export default function UserPage({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <UsersProvider>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
                            <p className="text-muted-foreground">Manage your users with their roles.</p>
                        </div>
                        <UserPrimaryButtons />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <InitData users={users} />
                    </div>
                </div>
                <UserDialogs />
            </UsersProvider>
        </AppLayout>
    );
}
