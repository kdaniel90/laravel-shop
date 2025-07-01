import {Head} from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout";
import AttributeForm from "@/pages/products/attributes/attribute-form";
import type {BreadcrumbItem} from "@/types";

interface CreateAttributeProps {
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product attributes',
        href: '/products/attributes',
    },
    {
        title: 'Create attribute',
        href: '/products/attributes/create',
    },
];

export default function CreateAttributes({status}: CreateAttributeProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new product attribute"/>
            <div className="flex min-h-svh flex-col gap-6 bg-background p-6 md:p-10 w-1/3">
                <h1 className="text-2xl font-bold">Create new product attribute</h1>
                <AttributeForm controller="create" status={status} />
            </div>
        </AppLayout>
    );
}
