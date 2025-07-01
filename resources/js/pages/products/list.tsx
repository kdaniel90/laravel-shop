import AppLayout from "@/layouts/app-layout";
import {Head, Link} from "@inertiajs/react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

export default function List() {
    return (
        <AppLayout>
            <Head title="Products list" />
            <div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                <div className="flex items-center gap-2">
                    <Link href={route('products.create')}>
                        <Button className="mr-2 cursor-pointer">
                            <span>Add new product</span><Plus />
                        </Button>
                    </Link>

                </div>
            </div>
        </AppLayout>
    );
}
