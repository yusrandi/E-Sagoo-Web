import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const currentUrl = '/' + page.url.split('?')[0].replace(/^\/+/, ''); // always leading slash, no query
                    const itemUrl =
                        '/' +
                        (typeof item.href === 'string' ? item.href : item.href.url)
                            .replace(/\/$/, '') // no trailing slash
                            .replace(/^\/+/, ''); // no duplicate leading slashes

                    const isActive = page.url.startsWith(
                        typeof item.href === 'string' ? item.href.replace(/\/$/, '') : item.href.url.replace(/\/$/, ''),
                    );

                    // console.log({ currentUrl }, { itemUrl }, { isActive });

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                                <Link href={item.href} prefetch>
                                    {/* {item.icon && <item.icon />} */}
                                    <div
                                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-3 transition-colors ${
                                            isActive ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                                        }`}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
