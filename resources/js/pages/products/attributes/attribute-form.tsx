import {Head, useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";
import AppLayout from "@/layouts/app-layout";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";
import {TagsInput} from "@/components/ui/tags-input";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";
import {IdAndName} from "@/types";

type AttributeForm = {
    id: number | undefined,
    name: string;
    values: {
        id: null | number,
        name: string
    }[];
};

interface Attribute extends IdAndName {
    values: IdAndName[];
}

interface AttributeFormProps {
    status?: string;
    attribute?: Attribute;
    controller: 'create' | 'edit'
}

const CREATE_ENDPOINT = 'products.attributes.create';
const EDIT_ENDPOINT = 'products.attributes.update';

export default function AttributeForm({status, attribute, controller}: AttributeFormProps) {

    const {data, setData, post, processing, errors, reset} = useForm<Required<AttributeForm>>({
        id: attribute?.id,
        name: attribute?.name || '',
        values: attribute?.values || [],
    });

    const handleAddTag = (newTag: string) => {
        if (newTag && !data.values.find((value) => value.name === newTag.trim())) {
            setData('values', [...data.values, {id: null, name: newTag.trim()}]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        setData('values', data.values.filter((t) => t.name !== tag));
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const endpoint = controller === 'edit' ? EDIT_ENDPOINT : CREATE_ENDPOINT;
        post(route(endpoint), {
            onFinish: controller === 'edit' ? undefined : () => reset('name', 'values'),
        });
    };

    return (
        <>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Attribute name</Label>
                        <Input
                            id="attribute-name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="name of the attribute"
                        />
                        <InputError message={errors.name}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="attribute-value">Attribute values</Label>
                        <TagsInput tags={data.values} addTag={handleAddTag} removeTag={handleRemoveTag}/>
                    </div>
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
