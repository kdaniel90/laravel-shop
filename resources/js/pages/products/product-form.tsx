import {useForm} from "@inertiajs/react";
import {FormEventHandler, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";
import {Button} from "@/components/ui/button";
import {CheckIcon, LoaderCircle} from "lucide-react";
import {IdAndName} from "@/types";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import {cn} from "@/lib/utils";

type ProductForm = {
    id: number | undefined,
    name: string;
    attributes: {
        id: null | number,
        name: string,
    }[];
};

interface Attribute extends IdAndName {
    values: IdAndName[];
}

interface Product extends IdAndName {
    attributes: IdAndName[]
}

interface ProductFormProps {
    status?: string;
    product?: Product;
    controller: 'create' | 'edit',
    productAttributes: Attribute[]
}

const CREATE_ENDPOINT = 'products.create';
const EDIT_ENDPOINT = 'products.attributes.update';

export default function ProductForm({status, productAttributes, product, controller}: ProductFormProps) {

    const {data, setData, post, processing, errors, reset} = useForm<Required<ProductForm>>({
        id: product?.id,
        name: product?.name || '',
        attributes: product?.attributes || [],
    });

    const setAttributes = (value: IdAndName[]) => {
        setData('attributes', value)
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const endpoint = controller === 'edit' ? EDIT_ENDPOINT : CREATE_ENDPOINT;
        post(route(endpoint), {
            onFinish: controller === 'edit' ? undefined : () => reset('name', 'attributes'),
        });
    };

    return (
        <>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Product name</Label>
                        <Input
                            id="product-name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="name of the product"
                        />
                        <InputError message={errors.name}/>
                    </div>
                    <div>
                        <h3>Attributes</h3>
                    </div>
                    {
                        productAttributes.map(attribute => (
                            <div className="grid gap-2 relative">
                                <Label htmlFor="attribute-value">Select {attribute.name}</Label>
                                <Listbox value={data.attributes} onChange={setAttributes} multiple>
                                    <ListboxButton
                                        className="border px-3 py-1 text-left rounded-md h-9 md:text-sm "
                                    >
                                        {attribute.values
                                            .filter((el) => data.attributes.some((f) => f.id === el.id && f.name === el.name))
                                            .map((attribute) => attribute.name).join(', ')}
                                    </ListboxButton>
                                    <ListboxOptions
                                        className="border z-10 bg-white rounded-md text-black w-full absolute top-full cursor-pointer"
                                    >
                                        {attribute.values.map((attributeValue) => (
                                            <ListboxOption key={attributeValue.id} value={attributeValue}>
                                                {({focus, selected}) => (
                                                    <div
                                                        className={cn('py-2 px-3 rounded-md flex gap-2', focus && 'bg-blue-100')}>
                                                        <CheckIcon className={cn(!selected && 'invisible')}/>
                                                        {attributeValue.name}
                                                    </div>
                                                )}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                            )
                        )
                    }
                    <Button type="submit" className="mt-4 w-full cursor-pointer" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin"/>}
                        Save
                    </Button>
                </div>
            </form>
            {status &&
                <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </>
    );
}
