import {NavMain} from '@/components/nav-main';
import {NavUser} from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import {type NavGroup,} from '@/types';
import {Link} from '@inertiajs/react';
import {ChartCandlestickIcon, LayoutGrid, PackageSearch, SettingsIcon} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            }
        ]
    },
    {
        title: 'Products',
        items: [
            {
                title: 'Products',
                href: '/products',
                icon: PackageSearch
            },
            {
                title: 'Attributes',
                href: 'products/attributes',
                icon: SettingsIcon
            },
            {
                title: 'Attribute values',
                href: 'products/attributes-values',
                icon: ChartCandlestickIcon
            }
        ]

    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo/>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    );
}
