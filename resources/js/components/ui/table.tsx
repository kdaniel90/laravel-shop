import { Card, Typography } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import type { IdAndName } from '@/types';

export default function Table({ tableHead, tableData, editLink }) {

    return (
        <Card className="m-4 h-full">
            <table className="min-w-max table-auto text-left">
                <thead>
                <tr>
                    {tableHead.map((head) => (
                        <th key={head} className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                            <Typography variant="small" color="blue-gray"
                                        className="leading-none font-normal opacity-70">
                                {head}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableData.map(({ id, name, values }, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Link href={route(editLink, { id: id })}>
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
    );
};
