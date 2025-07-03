import AppLayout from "@/layouts/app-layout";
import {Head} from "@inertiajs/react";
import type {BreadcrumbItem, IdAndName} from "@/types";
import ProductForm from "@/pages/products/product-form";

interface Product extends IdAndName {
    values: IdAndName[];
}

interface ProductAttribute extends IdAndName {
    values: IdAndName[];
}

interface CreateProductProps {
    status?: string;
    productAttributes: ProductAttribute[],
    product: Product
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
    {
        title: 'Edit',
        href: '/products/edit',
    },
];
//TODO: nice to have: order tags by attribute (right now they are mixed in added order)
export default function EditProduct({status, productAttributes, product}: CreateProductProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit product"/>
            <div className="flex min-h-svh flex-col gap-6 bg-background p-6 md:p-10 w-1/3">
                <h1 className="text-2xl font-bold">Edit product</h1>
                <ProductForm controller="edit" status={status} productAttributes={productAttributes} product={product} />
            </div>
        </AppLayout>
    );
}
