import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import aktivitasBudidaya from '@/routes/aktivitas-budidaya';
import catatanBudidaya from '@/routes/catatan-budidaya';
import category from '@/routes/category';
import lokasi from '@/routes/lokasi';
import product from '@/routes/product';
import transaction from '@/routes/transaction';
import user from '@/routes/user';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ClipboardList, Folder, LayoutGrid, Navigation, ShoppingCart, Shovel, Sprout, User2, Utensils } from 'lucide-react';
import AppLogo from './app-logo';

const navItemsByRole: Record<string, NavItem[]> = {
    admin: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Categories',
            href: category.index.url(),
            icon: Utensils,
        },
        {
            title: 'Products',
            href: product.index.url(),
            icon: ShoppingCart,
        },
        {
            title: 'Transactions',
            href: transaction.index.url(),
            icon: ClipboardList,
        },
        {
            title: 'Users',
            href: user.index.url(),
            icon: User2,
        },
        {
            title: 'Lokasi Kebun',
            href: lokasi.index.url(),
            icon: Navigation,
        },
        {
            title: 'Aktivitas Budidaya',
            href: aktivitasBudidaya.index.url(),
            icon: Shovel,
        },
        {
            title: 'Catatan Budidaya',
            href: catatanBudidaya.index.url(),
            icon: Sprout,
        },
    ],
    penjual: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Products',
            href: product.index.url(),
            icon: ShoppingCart,
        },
        {
            title: 'Orders',
            href: transaction.index.url(),
            icon: ClipboardList,
        },
    ],
    petani: [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Products',
            href: product.index.url(),
            icon: ShoppingCart,
        },
        {
            title: 'Orders',
            href: transaction.index.url(),
            icon: ClipboardList,
        },
        {
            title: 'Lokasi Kebun',
            href: lokasi.index.url(),
            icon: Navigation,
        },
        {
            title: 'Aktivitas Budidaya',
            href: aktivitasBudidaya.index.url(),
            icon: Shovel,
        },
        {
            title: 'Catatan Budidaya',
            href: catatanBudidaya.index.url(),
            icon: Sprout,
        },
    ],
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItemsByRole[auth.user.role as string]} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
