import {type SharedData} from '@/types';
import {Head, Link, usePage} from '@inertiajs/react';

export default function HomePage({filters, products}) {
    console.log(filters, products)
    return (
        <>
            <Head title="Home page"/>
            <div
                className="flex font-open-sans min-h-screen flex-col bg-gray-200 p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <div
                    className="flex w-full justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row">
                        <div className="grid grid-flow-col w-full rounded-md overflow-hidden">
                            <div className="col-span-1 p-4">
                                <h1 className="mb-2 font-bold text-2xl p-2 rounded-sm shadow-xs bg-white">Filters</h1>
                                {filters.map(filter => (
                                    <div className="bg-white px-3 py-2 rounded-sm mb-2 shadow-xs" key={filter.id}>
                                        <h3 className="font-bold uppercase mb-2">{filter.name}</h3>
                                        <ul className="pl-5">
                                            {filter.values.map(value => (
                                                <li className="hover:shadow-sm rounded-sm cursor-pointer pl-3 pb-1 pt-1 text-sm" key={value.id}>
                                                    {value.name} <span className="text-gray-500">({value.productsCount})</span>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-4 p-2">2nd col</div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
