import {Head} from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout";
import AttributeForm from "@/pages/products/attributes/attribute-form";
import {type BreadcrumbItem, IdAndName} from "@/types";

interface Attribute extends IdAndName {
    values: IdAndName[];
}
interface EditAttributeProps {
    status?: string;
    attribute: Attribute;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product attributes',
        href: '/products/attributes',
    },
    {
        title: 'Edit attribute',
        href: '/products/attributes/{id}',
    },
];

export default function EditAttribute({status, attribute}: EditAttributeProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new product attribute"/>
            <div className="flex min-h-svh flex-col gap-6 bg-background p-6 md:p-10 w-1/3">
                <h1 className="text-2xl font-bold">Edit product attribute</h1>
                <AttributeForm attribute={attribute} status={status} controller='edit' />
            </div>
        </AppLayout>
    );
}
