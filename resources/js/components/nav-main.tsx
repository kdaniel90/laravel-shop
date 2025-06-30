import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import {type NavGroup, type NavItem} from '@/types';
import {Link, usePage} from '@inertiajs/react';
import {useState} from "react";
import {Collapse} from "@material-tailwind/react";
import {ChevronDown, ChevronUp} from "lucide-react";

export function NavMain({items = []}: { items: NavGroup[] }) {

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <>
                        {item.items.length < 2
                            ? <RenderSidebarMenuElement menuElement={item.items[0]}/>
                            : <CollapsableMenuElement menuItem={item} />
                        }
                    </>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const CollapsableMenuElement = ({menuItem}: { menuItem: NavGroup }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <SidebarMenuButton onClick={toggleOpen} size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">
                <span className="truncate font-medium">{menuItem.title}</span>
                {!open ? <ChevronDown className="ml-auto size-4"/> : <ChevronUp className="ml-auto size-4"/>}
            </SidebarMenuButton>
            <Collapse open={open}>
                {menuItem.items.map((item) => (<RenderSidebarMenuElement menuElement={item}/>))                }
            </Collapse>
        </>
    )
}

const RenderSidebarMenuElement = ({menuElement}: { menuElement: NavItem }) => {
    const page = usePage();
    return (
        <SidebarMenuItem key={menuElement.title}>
            <SidebarMenuButton asChild isActive={page.url.startsWith(menuElement.href)}
                               tooltip={{children: menuElement.title}}>
                <Link href={menuElement.href} prefetch>
                    {menuElement.icon && <menuElement.icon/>}
                    <span>{menuElement.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
