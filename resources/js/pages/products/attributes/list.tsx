import { Button } from '@/components/ui/button';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type IdAndName } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ProductAttribute extends IdAndName {
    values: IdAndName[];
}

const TABLE_HEAD = ['Actions', 'Attribute Name', 'Attribute Values'];

export default function List({ productAttributes }: { productAttributes: ProductAttribute[] }) {
    return (
        <AppLayout>
            <Head title="Product attributes list" />
            <div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                <div className="flex items-center gap-2">
                    <Link href={route('products.attribute.create')}>
                        <Button className="mr-2 cursor-pointer">
                            <span>Add new product attribute</span>
                            <Plus />
                        </Button>
                    </Link>
                </div>
            </div>
            <Table
                tableHead={TABLE_HEAD}
                tableData={productAttributes}
                editLink="products.attributes.edit"
                deleteLink="products.attributes.delete"
            />
        </AppLayout>
    );
}
