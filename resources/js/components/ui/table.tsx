import {Link} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Pencil} from 'lucide-react';
import type {IdAndName} from '@/types';

interface TableData extends IdAndName {
    values: IdAndName[]
}

interface TableProps {
    tableHead: string[],
    tableData: TableData[],
    editLink: string
}

export default function Table({tableHead, tableData, editLink}: TableProps) {

    return (
        <div className="rounded-xl overflow-hidden shadow-lg m-4 h-full bg-white ">
            <table className="min-w-max table-auto text-left w-full">
                <thead>
                    <tr>
                        {tableHead.map((head) => (
                            <th key={head} className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                                <p className="leading-none font-normal opacity-70 text-gray-700">
                                    {head}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {tableData.map(({id, name, values}, index) => (
                    <tr key={index} className="even:bg-gray-100">
                        <td className="p-4">
                            <Link href={route(editLink, {id: id})}>
                                <Button className="mr-2 cursor-pointer">
                                    <Pencil/> <span>Edit</span>
                                </Button>
                            </Link>
                        </td>
                        <td className="p-4">
                            <p className="leading-none font-normal opacity-70 text-black">
                                {name}
                            </p>
                        </td>
                        <td className="p-4">
                            <p>
                                {(values || []).map((tag: IdAndName, index: number) => (
                                    <span
                                        key={`${index}-${tag}`}
                                        className="mr-2 inline-flex items-start justify-start rounded-[32px] bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 shadow-sm"
                                    >
                                            {tag.name}
                                        </span>
                                ))}
                            </p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
