/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { filter, getColors, getCategories, getOpenFilterMovil } from '../../redux/actions'
import Card from "../Cards/Card";
import ProductDetail from '../Product/productDetail';

import Brand from './Brand'


import Footer from '../Footer/Footer'



export default function Filters() {
    const colors = useSelector((state) => state.colors)
    const categories = useSelector((state) => state.categories)
    const openFilter = useSelector((state) => state.openFilter)
    // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const products = useSelector((state) => state.productsFiltered)
    const brands = useSelector((state) => state.brands)
    const brandFilteredMemory = useSelector((state) => state.brandFilteredMemory)
    const [optionsFilters, setOptionsFilters] = useState([])
    const searchName = useSelector((state) => state.searchName)
    const [filters, setFilters] = useState([])
    // const [open, setOpen] = useState(false)




    // const filters = [
    //     {
    //         id: 'color',
    //         name: 'Color',
    //         options: [
    //             { value: 'White', label: 'White', checked: false },
    //             { value: 'Black', label: 'Black', checked: false },
    //             { value: 'Blue', label: 'Blue', checked: false },
    //             { value: 'Grey', label: 'Grey', checked: false },
    //             { value: 'Pink', label: 'Pink', checked: false },
    //             { value: 'Red', label: 'Red', checked: false },
    //             { value: 'Violet', label: 'Violet', checked: false },
    //             { value: 'Green', label: 'Green', checked: false },
    //         ],
    //     },
    //     {
    //         id: 'category',
    //         name: 'Category',
    //         options: [
    //             { value: 'Shoes', label: 'Shoes', checked: false },
    //             { value: 'T-shirts', label: 'T-shirts', checked: false },
    //             { value: 'Jackets', label: 'Jackets', checked: false },
    //             { value: 'Caps', label: 'Caps', checked: false },
    //             { value: 'Shorts', label: 'Shorts', checked: false },
    //             { value: 'Pants', label: 'Pants', checked: false },
    //             { value: 'Accessories', label: 'Accessories', checked: false },
    //         ],
    //     },
    // {
    //     id: 'size',
    //     name: 'Size',
    //     options: [
    //         { value: 'XS', label: 'XS', checked: false },
    //         { value: 'S', label: 'S', checked: false },
    //         { value: 'M', label: 'M', checked: false },
    //         { value: 'L', label: 'L', checked: false },
    //         { value: 'XL', label: 'XL', checked: false },
    //     ],
    // },
    //     {
    //         id: 'genre',
    //         name: 'Genre',
    //         options: [
    //             { value: 'Mens', label: 'Mens', checked: false },
    //             { value: 'Womens', label: 'Womens', checked: false },
    //             { value: 'Unisex', label: 'Unisex', checked: false },
    //         ],
    //     },
    // ]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getColors())

    }, [])

    useEffect(() => {
        let filteres = [
            {
                id: 'color',
                name: 'Color',
                options: [],
            },
            {
                id: 'category',
                name: 'Category',
                options: [],
            },
            {
                id: 'genre',
                name: 'Genre',
                options: [
                    { value: 'Mens', label: 'Mens', checked: false },
                    { value: 'Womens', label: 'Womens', checked: false },
                    { value: 'Unisex', label: 'Unisex', checked: false },
                ],
            },
        ]
        // if (colors.length !== 0) {
        let optionsColor = colors?.map((c) => {
            return {
                value: c.name,
                label: c.name,
                checked: false,
            }
        })
        filteres[0].options = [...optionsColor]
        // }
        // if (categories.length !== 0) {
        let optionsCategory = categories?.map((c) => {
            return {
                value: c.name,
                label: c.name,
                checked: false,
            }
        })
        filteres[1].options = [...optionsCategory]
        // }
        setFilters(filteres)
    }, [colors, categories])

    const handleClickRadio = (e, section) => {
        // e.preventDefault()
        // e.target.id
        // filter-color-0
        // filter-category-0
        // filter-size-0
        // document.getElementById(e.target.id).checked = true;
        if (e.target.checked === true) {
            setOptionsFilters([...optionsFilters, { filters: section, name: e.target.value, id: e.target.id }])
        } else {
            setOptionsFilters(optionsFilters.filter((o) => o.name !== e.target.value))
        }

    }

    const handleClickRadioButtonMinusPlus = (e) => {
        let filteres = filters;
        let options = []
        let optionsColor = []
        console.log("en optionsFilters------------>", optionsFilters) //lo elegido
        console.log("en filters------------>", filters)  //la lista de filtros con true o false

        let colorSelect = optionsFilters?.map((f) => filters[0].options?.filter((m) => f.name === m.value))
        // colorSelect?.map((c) => c.checked = true)
        console.log("colorSelect", colorSelect)



        let optionsCategory = filters[1].options?.map((f) => {
            return optionsFilters.filter((o) => { o.name === f.value })

        })
        let optionsGenre = filters[2].options?.map((f) => {
            return optionsFilters.filter((o) => { o.name === f.value })

        })

    }

    useEffect(() => {
        console.log("en componente optionsFilters en useEffect", optionsFilters)
        dispatch(filter(optionsFilters))
    }, [optionsFilters])


    const handlemobileFiltersOpen = (value) => {
        dispatch(getOpenFilterMovil(value))
    }


    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={openFilter} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={handlemobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => handlemobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Brands</h3>
                                        <Brand
                                            optionsFilters={optionsFilters}
                                            searchName={searchName}
                                            brandFilteredMemory={brandFilteredMemory}
                                        />
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {/* {brands?.map((brand) => (
                                                <li key={brand.name}>
                                                    <button id={brand.name} onClick={(e) => handleClickBrand(e, "brand", brand.name)} className="block px-2 py-3">
                                                        {brand.name}
                                                    </button>
                                                </li>
                                            ))} */}
                                        </ul>
                                        {/* este es en responsive */}
                                        {filters?.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button
                                                                className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            // onClick={(e) => handleClickRadioButtonMinusPlus(e)}
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            onClick={(e) => handleClickRadioButtonMinusPlus(e)}
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true" />
                                                                    )}

                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6" onClick={(e) => handleClickRadio(e, section.id)}>
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center" >
                                                                        <input

                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"

                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Brands</h3>
                                <Brand
                                    optionsFilters={optionsFilters}
                                    searchName={searchName}
                                    brandFilteredMemory={brandFilteredMemory}
                                />
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {/* {brands?.map((brand) => (
                                        <li key={brand.name}>
                                            <button id={brand.name} onClick={(e) => handleClickBrand(e, "brand", brand.name)} >{brand.name}</button>
                                        </li>
                                    ))} */}
                                </ul>
                                {/* //funcionó el click en minus!!! */}
                                {filters?.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    // onClick={(e) => handleClickRadioButtonMinusPlus(e)}
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon
                                                                    onClick={(e) => handleClickRadioButtonMinusPlus(e)}
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4" onClick={(e) => handleClickRadio(e, section.id)}>
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center" >
                                                                <input

                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"

                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">


                                {/* Replace with your content */}
                                <div className='flex flex-wrap'>
                                    {products?.map((e) => {
                                        return (
                                            <div className='flex items-center justify-start text-center'>

                                                <div key={e._id} className=" my-3">

                                                    <Card
                                                        key={e._id}
                                                        id={e._id}
                                                        name={e.name}
                                                        image={e.image}
                                                        price={e.price}
                                                        brand={e.brand.name}
                                                        color={e.color}
                                                        description={e.description}
                                                        size={e.size}
                                                    />


                                                </div>
                                                <div>
                                                    <ProductDetail
                                                        key={e._id & e._id}
                                                        id={e._id}
                                                        name={e.name}
                                                        image={e.image}
                                                        price={e.price}
                                                        brand={e.brand.name}
                                                        color={e.color}
                                                        size={e.size}
                                                        description={e.description}
                                                    // open={open}
                                                    // setOpen={setOpen}
                                                    />
                                                </div>

                                            </div>

                                        )
                                    })}
                                </div>

                                {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full" /> */}



                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>

        </div >

    )
}
