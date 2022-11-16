/*eslint-disable */
import React, {Fragment, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getopenDetail, addToCart, getProducts, getPReviews } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import StarIcon  from '../../icons/StartIcon.svg'
import StarIconFill from '../../icons/starIconFill.svg'


function ProductDetail(product) {

    const dispatch = useDispatch()
    // const { productId } = useParams();
    // const product = useSelector((state) => state.details)
    const openDetail = useSelector((state) => state.openDetail)
    
    const reviews = useSelector((state) => state.reviews)
    const [open, setOpen] = useState(false)
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.size[2])
    const slider = useRef()
    const [promedReviews, setPromedReviews] = useState(0)
    const [countReviews, setCountReviews] = useState(0)
    const [image, setImage]=React.useState(0)

    let navigate = useNavigate()
    const routeChange = () => {
        let path = "/cardReviews";
        navigate(path)
    }

    let productAddCart = {}

    function nextImage() {
        if(image === product.image.length -1) {
            setImage(0)
        } else {
            setImage(image + 1)
        }
    }

    function prevImage() {
        if(image === 0) {
            setImage(product.image.length - 1)
        } else {
            setImage(image - 1)
        }
    }


    React.useEffect(() => {
        if(reviews.length === 0) {
            dispatch(getPReviews())
        }
        let reviewsPId = reviews.filter((e) => e.productId === product.id)
        // console.log('reviewsPId***//////////------------++++++++++++', reviewsPId)

        if (reviewsPId.length !== 0) {
            // console.log('products reviews---------------/////////////////', product.reviews)
            let count = reviewsPId.length
            let sumaReviews = 0
            reviewsPId.map((r) => {
                sumaReviews += r.score
            })
            let promedioReviews = sumaReviews / count
            setPromedReviews(promedioReviews)
            setCountReviews(count)
        }
        product.size?.map((s) => {
            s.stock > 0 ? (s.inStock = true) : (s.inStock = false)
        })

        if (openDetail === product.id) {
            setOpen(true)
            // console.log(open)
        }
    }, [product, openDetail, selectedSize, image])

    

    const handleOnClickClose = (e) => {
        e.preventDefault()
        product.setOpen ?
            product.setOpen(false) :
            setOpen(false)
        dispatch(getopenDetail(''))
    }

    const handleChangeSize = (e) => {
        // console.log('select size en detail', e)
        setSelectedSize(e)
    }
    const handleAddToCart = (e) => {
        e.preventDefault()
        // console.log('add to cart')
        productAddCart = { ...product }
        productAddCart.size = selectedSize
        // console.log('e en add to cart--------------------------', e.target.value, product.size, selectedSize, productAddCart);
        setOpen(false)
        dispatch(getopenDetail(''))
        dispatch(addToCart(productAddCart));
        dispatch(getProducts())
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

   

    return product.name ? (
        <Transition.Root show={product.opne ? product.opne : open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={(e) => handleOnClickClose(e)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0  overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                        onClick={(e) => handleOnClickClose(e)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            {/* poner carrusel con mapeo de imagenes */}
                                            {/* <img src={product.image[0]} alt='imagen producto' className="object-scale-down object-center" /> */}
                                            <div className="flex items-center bg-white justify-center w-full h-full">
                                             
                                                <button
                                                className='z-20 w-fit h-fit position-absolute left-0'
                                                onClick={() =>
                                                    prevImage()
                                                }
                                            >
                                                <img
                                                    className="h-6 w-6 hover:h-7 hover:w-7"
                                                    src="/flecha1.png"
                                                    alt="flecha1"
                                                />
                                            </button>
                                            
                                                <div
                                                    ref={slider}
                                                    className="snap-x overflow-hidden scroll-smooth h-fit flex items-center justify-start text-center m-4"
                                                >
                                                    
                                                    <img
                                                        src={product.image[image]}
                                                        alt="imagen producto"
                                                        className="object-scale-down object-center w-full h-full"
                                                    />
                                                    
                                                </div>
                                                
                                                    <button
                                                    className='w-fit h-fit z-20 position-absolute right-0'
                                                    onClick={() =>
                                                        nextImage()
                                                    }
                                                >
                                                    <img
                                                        className="h-6 w-6 hover:h-7 hover:w-7"
                                                        src="/flecha2.png"
                                                        alt="flecha2"
                                                    />
                                                </button>
                                              
                                            </div>
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                                {product.name}
                                            </h2>
                                            <p className="text-sm text-gray-900 sm:pr-12">
                                                {product.description}
                                            </p>
                                            <section
                                                aria-labelledby="information-heading"
                                                className="mt-2"
                                            >
                                                <h3
                                                    id="information-heading"
                                                    className="sr-only"
                                                >
                                                    Product information
                                                </h3>

                                                <p className="text-2xl text-gray-900">
                                                     ${product.price} USD
                                                </p>

                                                Reviews
                                                <div className="mt-6">
                                                    <h4 className="sr-only">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            {
                                                                [...Array(5)].map((rating, i) => {
                                                                   return (
                                                                    promedReviews > i ? (
                                                                        
                                                                        <img 
                                                                         src={StarIconFill}
                                                                        key={i}
                                                                        className={classNames(
                                                                            'h-5 w-5 flex-shrink-0'
                                                                        )}/>
                                                                ): (
                                                                    <img 
                                                                    src={StarIcon}
                                                                   key={i}
                                                                   className={classNames(
                                                                       'h-5 w-5 flex-shrink-0'
                                                                   )}/>
                                                                ) 
                                                                   )
                                                                })
                                                            }              
                                                        </div>
                                                        <p className="sr-only">{promedReviews} out of 5 stars</p>
                                                        <button type="button" onClick={routeChange}className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                            {countReviews} reviews
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>

                                            <section
                                                aria-labelledby="options-heading"
                                                className="mt-10"
                                            >
                                                <h3
                                                    id="options-heading"
                                                    className="sr-only"
                                                >
                                                    Product options
                                                </h3>

                                                <form>
                                                    {/* Colors */}
                                                    {/* <div>
                                                                    <h4 className="text-sm font-medium text-gray-900">Color</h4>
                                                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                                        <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                                                                        <span className="flex items-center space-x-3">
                                                                            {product.colors.map((color) => (
                                                                                <RadioGroup.Option
                                                                                    key={color.name}
                                                                                    value={color}
                                                                                    className={({ active, checked }) =>
                                                                                        classNames(
                                                                                            color.selectedClass,
                                                                                            active && checked ? 'ring ring-offset-1' : '',
                                                                                            !active && checked ? 'ring-2' : '',
                                                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <RadioGroup.Label as="span" className="sr-only">
                                                                                        {' '}
                                                                                        {color.name}{' '}
                                                                                    </RadioGroup.Label>
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className={classNames(
                                                                                            color.className,
                                                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                                                        )}
                                                                                    />
                                                                                </RadioGroup.Option>
                                                                            ))}
                                                                        </span>
                                                                    </RadioGroup>
                                                                </div> */}

                                                    {/* Sizes */}
                                                    <div className="mt-10">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium text-gray-900">
                                                                Sizes
                                                            </h4>
                                                            {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Size guide
                                                                </a> */}
                                                        </div>

                                                        <RadioGroup
                                                            value={selectedSize}
                                                            onChange={setSelectedSize}
                                                            className="mt-4"
                                                        >
                                                            <RadioGroup.Label className="sr-only">
                                                                Choose a size
                                                            </RadioGroup.Label>
                                                            <div className="grid grid-cols-4 gap-4">
                                                                {product.size?.map(
                                                                    (s) => (
                                                                        <RadioGroup.Option
                                                                            key={s.size}
                                                                            value={s}
                                                                            disabled={!s.stock}
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    s.stock
                                                                                        ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                                        : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                                                    active
                                                                                        ? 'ring-2 ring-gray-900'
                                                                                        : '',
                                                                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                                                )}>
                                                                            {({ active, checked }) => (<>
                                                                                <RadioGroup.Label as="span">
                                                                                    {s.size}
                                                                                </RadioGroup.Label>
                                                                                {s.stock ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active
                                                                                                ? 'border'
                                                                                                : 'border-2',
                                                                                            checked
                                                                                                ? 'border-gray-900'
                                                                                                : 'border-transparent',
                                                                                            'pointer-events-none absolute -inset-px rounded-md'
                                                                                        )}
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                ) : (
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                                    >
                                                                                        <svg
                                                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                            viewBox="0 0 100 100"
                                                                                            preserveAspectRatio="none"
                                                                                            stroke="currentColor"
                                                                                        >
                                                                                            <line
                                                                                                x1={0}
                                                                                                y1={100}
                                                                                                x2={100}
                                                                                                y2={0}
                                                                                                vectorEffect="non-scaling-stroke"
                                                                                            />
                                                                                        </svg>
                                                                                    </span>
                                                                                )}
                                                                            </>
                                                                            )}
                                                                        </RadioGroup.Option>
                                                                    )
                                                                )}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <button
                                                        onClick={e => handleAddToCart(e, product)}
                                                        type="button"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                    >
                                                        Add to bag
                                                    </button>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    ) : (
        null
    )
}

export default ProductDetail
/*eslint-enable */