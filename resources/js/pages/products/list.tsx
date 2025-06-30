import AppLayout from "@/layouts/app-layout";
import {Head} from "@inertiajs/react";
import SettingsLayout from "@/layouts/settings/layout";
import HeadingSmall from "@/components/heading-small";
import AppearanceTabs from "@/components/appearance-tabs";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Menu, Plus} from "lucide-react";


export default function List() {
    return (
        <AppLayout>
            <Head title="Products list" />
            <div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                <div className="flex items-center gap-2">
                    <Button className="mr-2">
                        <span>Add new product</span><Plus />
                    </Button>
                </div>
            </div>
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
