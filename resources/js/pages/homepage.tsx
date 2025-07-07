import {cn} from '@/lib/utils';
import {IdAndName} from '@/types';
import {Head, useForm} from '@inertiajs/react';
import {Fragment, useEffect} from 'react';

interface FilterForm {
    filters: null | {
        filterId: number;
        valueId: number;
    }[];
}

interface FilterValues extends IdAndName {
    productsCount: number;
}

interface Filter extends IdAndName {
    values: FilterValues[];
}

interface ProductValues extends IdAndName {
    attributes: { name: string }[];
}

interface Product extends IdAndName {
    values: ProductValues[];
}

export default function HomePage({filters, products}: { filters: Filter[]; products: Product[] }) {

    return (
        <>
            <Head title="Home page"/>
            <div className="px-20 py-2 bg-white flex items-center text-black shadow-md">
                <img className="h-16" src="/img/logo.jpg" alt="logo"/>
                <h1 className="font-bold text-2xl ">Welcome! Here you can find all our products!</h1>
            </div>
            <div
                className="flex min-h-screen flex-col bg-gray-200 p-6 font-open-sans text-[#1b1b18] lg:justify-center lg:p-8">
                <div
                    className="flex w-full justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row">
                        <ProductsDisplay products={products} filters={filters}/>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

const ProductsDisplay = ({products, filters}: { products: Product[], filters: Filter[] }) => {

    const groupedFilters: { [key: string]: string } = {};
    const filterNames: string[] = [];
    filters.forEach((filter) => {
        groupedFilters[filter.name] = filter.name;
        filterNames.push(filter.name);
    });
    const {data, setData, post} = useForm<Required<FilterForm>>({
        filters: null,
    });

    useEffect(() => {
        if (data.filters === null) {
            return;
        }
        post(route('products.filter'));
    }, [data.filters, post]);

    const onFilterClick = (filterId: number, valueId: number) => {
        const isFilterSet = (data.filters || []).find((filter) => filter.filterId === filterId && filter.valueId === valueId);
        if (isFilterSet) {
            setData(
                'filters',
                (data.filters || []).filter((value) => value.valueId !== valueId),
            );
        } else {
            setData('filters', [...(data.filters || []), {filterId, valueId}]);
        }
    };

    if (products.length === 0) {
        return <h1 className="text-6xl w-full text-center"> No products found</h1>
    }
    return (
        <div className="grid w-full grid-cols-[25%_75%] overflow-hidden rounded-md">
            <div className="p-3">
                <h1 className="mb-6 rounded-sm bg-white p-2 text-center text-2xl font-bold shadow-xs">Filters</h1>
                {filters.map((filter) => (
                    <div className="mb-3 rounded-sm bg-white px-3 py-2 shadow-xs" key={filter.id}>
                        <h3 className="mb-2 font-bold uppercase">{filter.name}</h3>
                        <ul className="pl-5">
                            {filter.values.map((value) => {
                                if (value.productsCount === 0) {
                                    return <Fragment key={value.id}/>;
                                }
                                return (
                                    <li
                                        className={cn('mb-1 cursor-pointer rounded-sm pt-1 pb-1 pl-3 text-sm hover:shadow-sm', {
                                            'bg-gray-100 shadow-sm': (data.filters || []).find(
                                                (setFilters) => setFilters.filterId === filter.id && setFilters.valueId === value.id,
                                            ),
                                        })}
                                        key={value.id}
                                        onClick={() => onFilterClick(filter.id, value.id)}
                                    >
                                        <span>{value.name} </span>
                                        <span className="text-gray-500">({value.productsCount})</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="p-3">
                <h1 className="mb-6 rounded-sm bg-white p-2 text-center text-2xl font-bold shadow-xs">Products</h1>
                <div className="grid grid-cols-3 gap-3">
                    {products.map((product) => {
                        const groupedValues = Object.groupBy(product.values, ({attributes}) => groupedFilters[attributes[0].name]);
                        return (
                            <div key={product.id} className="rounded-sm bg-white px-3 py-3 shadow-xs">
                                <h5 className="relative mb-4 pb-1 text-center text-xl font-bold text-gray-500 before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-black before:to-transparent">
                                    {product.name}
                                </h5>
                                <div className="rounded-xs p-3 pt-1 shadow-xs shadow-gray-400">
                                    <span className="text-red-400">Attributes:</span>
                                    <ul key={product.id} className="pl-3">
                                        {filterNames.map((name) => {
                                            const values = groupedValues[name];
                                            if (!values) {
                                                return <Fragment key={name}/>;
                                            }
                                            return (
                                                <li key={name}>
                                                    <span className="font-bold">{name}: </span>
                                                    <span>{values.map((value) => value.name).join(', ')}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
