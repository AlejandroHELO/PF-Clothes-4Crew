import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux'
import { getViewCart, deleteFromCart } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/20/solid'
import { ADD_TO_CART } from '../../redux/types'


export default function Cart({ open, setOpen, products }) {
    let tot = 0
    let value = 0
    const viewCart = useSelector(state => state.viewCart)
    // const [open, setOpen] = useState(false)
    const openDetail = useSelector((state) => state.openDetail)
    // const products = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        console.log('products en cart', products)

        // Cálculo del total
        products.map((p) => {
            tot = p.price + tot
        })
        setTotal(tot)
        //comparo las cantidades guardadas en LocalStorage y las guardadas en la base de datos

    }, [products])

    const handleQtyClick = (e, product) => {
        e.preventDefault()
        console.log('e. target en handle click', e.currentTarget.id, product.count)
        if (e.currentTarget.id === 'Mas') {
            console.log('entré en mas')
            value = product.count + 1;
            if (value > product.size.stock) {
                value = product.size.stock;
            }
        }
        else {
            console.log('entré en menos')
            value = product.count - 1;
            if (value < 1) {
                value = 1;
            }
        }
        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : [];

        cart.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItem.count = value;
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch({
            type: ADD_TO_CART,
            payload: cart,
        });
    }
    console.log('produts en cart', products)
    return (
        <Transition.Root show={open} as={Fragment} >
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {products?.map((product) => (
                                                            <li key={product.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product.image}
                                                                        alt='img'
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                {/* agregar enlace a detail en name href={product.href}*/}
                                                                                <p>{product.name}</p>
                                                                            </h3>
                                                                            <p className="ml-4">U$S&nbsp;{product.price}</p>
                                                                        </div>
                                                                        <div className="flex flex-row justify-center text-base font-medium">
                                                                            <p className="mt-1 text-sm text-gray-500">Color:&nbsp;{product.color}&nbsp;&nbsp;&nbsp;</p>
                                                                            <p className="mt-1 text-sm text-gray-500">Size:&nbsp;{product.size.size}</p>
                                                                        </div>

                                                                    </div>

                                                                    <div className="flex flex-1 items-end justify-between text-sm">

                                                                        {/* -------------PARA ELEGIR LA CANTIDAD de la talla elegida------------------ */}
                                                                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">

                                                                            <div className="flex flex-1 justify-between sm:hidden">
                                                                                <botton

                                                                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                                                >
                                                                                    Menos
                                                                                </botton>
                                                                                <botton

                                                                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                                                >
                                                                                    Más
                                                                                </botton>
                                                                            </div>
                                                                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                                                                <div>
                                                                                    {/* <p className="text-sm text-gray-700">
                                                                                        Qty
                                                                                        <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '} 
                                                                                        <span className="font-medium">97</span> results
                                                                                    </p> */}
                                                                                </div>
                                                                                <div>
                                                                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                                                        <botton
                                                                                            type="button"
                                                                                            onClick={e => handleQtyClick(e, product)}
                                                                                            name="Menos"
                                                                                            id="Menos"
                                                                                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                                                                        >
                                                                                            <span className="sr-only">Menos</span>
                                                                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" name="Menos" />
                                                                                        </botton>
                                                                                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                                                                        <botton

                                                                                            aria-current="page"
                                                                                            className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                                                                                        >
                                                                                            {product.count}
                                                                                        </botton>

                                                                                        <botton
                                                                                            type="button"
                                                                                            onClick={e => handleQtyClick(e, product)}
                                                                                            name="Mas"
                                                                                            id="Mas"
                                                                                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                                                                        >
                                                                                            <span className="sr-only">Más</span>
                                                                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" name="Mas" />
                                                                                        </botton>
                                                                                    </nav>
                                                                                    <p className="mt-1 text-sm text-gray-500">disponibles&nbsp;{product.size.stock}</p>
                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                        {/* ------------------------------------- */}
                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-slate-900 hover:text-slate-500"
                                                                                onClick={() => { dispatch(deleteFromCart(product)) }}
                                                                            >
                                                                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-bold text-gray-900 ">
                                                <p>Total</p>
                                                <p>U$S&nbsp;{total}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <div
                                                    type="button"
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm  hover:bg-zinc-700"
                                                >
                                                    Checkout
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-gray-500 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

    )
}
// ) : (
//     console.log('no hay nada')