import {Link, useForm} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Pencil, X} from 'lucide-react';
import type {IdAndName} from '@/types';
import {FormEventHandler, useRef} from "react";
import HeadingSmall from "@/components/heading-small";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";

interface TableData extends IdAndName {
    values: IdAndName[]
}

interface TableProps {
    tableHead: string[],
    tableData: TableData[],
    editLink: string,
    deleteLink: string
}

export default function Table({tableHead, tableData, editLink, deleteLink}: TableProps) {

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
                                <Button className="mr-2 cursor-pointer bg-green-500 hover:bg-green-600">
                                    <Pencil/> <span>Edit</span>
                                </Button>
                            </Link>
                            <DeleteResource deleteRoute={deleteLink} id={id}/>
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


const DeleteResource = ({deleteRoute, id}: { deleteRoute: string, id: number }) => {

    const {delete: destroy, processing, reset, clearErrors} = useForm();

    const deleteResource: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route(deleteRoute, {id: id}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive"><X/>Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete this resource?</DialogTitle>
                <DialogDescription>
                    This will remove the resource and all of it's associations
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteResource}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="cursor-pointer" variant="destructive" disabled={processing} asChild>
                            <button type="submit">Delete</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
