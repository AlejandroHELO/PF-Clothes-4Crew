import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, filter, brandElect, search } from '../../redux/actions'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Brand({ optionsFilters, searchName, brandFilteredMemory }) {
    const brands = useSelector((state) => state.brands)
    const selectedBrands = useSelector((state) => state.selectedBrands)
    const [selected, setSelected] = useState([
        selectedBrands
    ])

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getBrands())
    }, [])

    useEffect(() => {
        brands?.map((b) => {
            b.avatar = `/images/brandsLogo/${b.name}.svg`
        })
        brands.unshift(
            {
                id: 1,
                name: 'All',
                avatar: `/images/brandsLogo/All.svg`,

            }
        )
        setSelected(brands[0])
    }, [brands])

    useEffect(() => {
        setSelected(selectedBrands)
    }, [selectedBrands])

    const handleClickBrand = (e, filters, name, brand) => {
        setSelected(brand)
        dispatch(filter([{ filters: filters, name: name, id: e.currentTarget.id }, ...optionsFilters]))
        dispatch(brandElect(brand))
        dispatch(search(searchName))


    }
    console.log('brandFilteredMemory', brandFilteredMemory)
    console.log('optionsFilters', optionsFilters)
    optionsFilters
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700 mx-4">Selected brands</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                <img src={selected.avatar} alt="" className=" h-10 w-10 flex-shrink-0 " />
                                <span className="ml-3 block truncate">{selected.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {brands?.map((brand) => (
                                    <Listbox.Option
                                        key={brand.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-gray-400' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={brand}
                                        onClick={(e) => handleClickBrand(e, "brand", brand.name, brand)}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img src={brand.avatar} alt="" className="h-10 w-10 flex-shrink-0 " />
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {brand.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4 '
                                                        )}

                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />

                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
