import AppLayout from "@/layouts/app-layout";
import {Head} from "@inertiajs/react";
import type {BreadcrumbItem, IdAndName} from "@/types";
import ProductForm from "@/pages/products/product-form";

interface ProductAttribute extends IdAndName {
    values: IdAndName[];
}

interface CreateProductProps {
    status?: string;
    productAttributes: ProductAttribute[]
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
    {
        title: 'Create',
        href: '/products/create',
    },
];

export default function CreateProduct({status, productAttributes}: CreateProductProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new product"/>
            <div className="flex min-h-svh flex-col gap-6 bg-background p-6 md:p-10 w-1/3">
                <h1 className="text-2xl font-bold">Create new product</h1>
                <ProductForm controller="create" status={status} productAttributes={productAttributes} />
            </div>
        </AppLayout>
    );
}
