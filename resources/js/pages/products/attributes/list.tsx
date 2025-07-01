import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, Typography } from '@material-tailwind/react';
import { Pencil, Plus } from 'lucide-react';
import { type IdAndName } from '@/types';

interface ProductAttribute extends IdAndName {
    values: IdAndName[];
}

const TABLE_HEAD = ['Actions', 'Attribute Name', 'Attribute Values'];

export default function List({ productAttributes }: { productAttributes: ProductAttribute[] }) {

    return (
        <AppLayout>
            <Head title="Products list" />
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
            <Card className="m-4 h-full">
                <table className="min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                                    <Typography variant="small" color="blue-gray" className="leading-none font-normal opacity-70">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productAttributes.map(({ id, name, values }, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Link href={route(`products.attributes.edit`, { id: id })}>
                                        <Button className="mr-2 cursor-pointer">
                                            <Pencil /> <span>Edit</span>
                                        </Button>
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        {values.map((tag: IdAndName, index: number) => (
                                            <span
                                                key={`${index}-${tag}`}
                                                className="mr-2 inline-flex items-start justify-start rounded-[32px] bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 shadow-sm"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}
