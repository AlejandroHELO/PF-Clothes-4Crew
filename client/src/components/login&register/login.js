import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { validate } from './validation'
import { LogInAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

export default function LogIn({ open, setOpen }) {
    const cancelButtonRef = useRef(null)
    let dispatch = useDispatch()
    const [error, setErrors] = React.useState({
        
    })
    let [loading, setLoading] = React.useState(false)
    let [input, setInput] = React.useState({
        email: '',
        password: ''
    })
    let [buttonText, setButtontext] = React.useState('')
    let [background, setBack] = React.useState('indigo')

    const handleChange = (e) => {
        setErrors({})
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setButtontext('Enviando')
        setErrors(() => validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        try {
            dispatch(LogInAction(input))
            setTimeout(() => {
                setBack('green')
                setButtontext('Todo correcto')
            }, 1000)
            setTimeout(() => {
                setLoading(false)
                setBack('indigo')
            },2000)
        } catch (error) {
            setBack('red')
            setButtontext('Algo salió mal')
            setTimeout(() => {
                setBack('indigo')
                setButtontext('Enviar de nuevo')
                setInput({
                    email: '',
                    password: ''
                })
                setLoading(false)
            }, 5000)
        }
    } 

 

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all m:my-8 m:w-fit m:max-w-lg m:h-fit">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div className="mt-2">
                                                <div className="flex min-h-full items-center justify-center ">
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            width: 'fit-content',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: 'fit-content',
                                                                height: '240px',
                                                                overflow:
                                                                    'hidden',
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            <img
                                                                className="mx-auto h-12 w-auto"
                                                                src="/images/clothes4crew.jpg"
                                                                alt="Your Company"
                                                                style={{
                                                                    width: '600px',
                                                                    height: '400px',
                                                                    objectFit:
                                                                        'cover',
                                                                    objectPosition:
                                                                        'center',
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                                Bienvenido de
                                                                nuevo
                                                            </h2>
                                                          <div className='flex justify-content-end w-full'>
                                                          <Link to='/register'><p>Aún no tengo cuenta</p></Link>
                                                          </div>
                                                            <form
                                                                className="mt-8 space-y-6"
                                                                action="#"
                                                                method="POST"
                                                                onSubmit={(e) => handleSubmit(e)}
                                                            >
                                                                <input
                                                                    type="hidden"
                                                                    name="remember"
                                                                    defaultValue="true"
                                                                />
                                                                <div className="-space-y-px rounded-md shadow-sm">
                                                                    <div>
                                                                        <label
                                                                            htmlFor="email-address"
                                                                            className="sr-only"
                                                                        >
                                                                            Correo
                                                                            electronico:
                                                                        </label>
                                                                        <input
                                                                            id="email-address"
                                                                            name="email"
                                                                            autoComplete="email"
                                                                            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${error.email}`}
                                                                            placeholder="Email address"
                                                                            onChange={(e) => handleChange(e)}
                                                                            value={input.email}
                                                                        />
                                                                        {
                                                                            error.email && (
                                                                                <p style={{color:'red'}}>{error.email}</p>
                                                                            )

                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <label
                                                                            htmlFor="password"
                                                                            className="sr-only"
                                                                        >
                                                                            Contraseña
                                                                        </label>
                                                                        <input
                                                                            id="password"
                                                                            name="password"
                                                                            type="password"
                                                                            autoComplete="current-password"
                                                                            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${error.password}`}
                                                                            placeholder="Password"
                                                                            onChange={(e) => handleChange(e)}
                                                                            value={input.password}
                                                                        />
                                                                        {
                                                                            error.password && (
                                                                                <p style={{color: 'red'}}>{error.password}</p>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                /> */}
                                                                        {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label> */}                
                                                             
                                                                </div>

                                                                    <div className="text-sm">
                                                                        <a
                                                                            href="#"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            ¿Olvidaste
                                                                            tu
                                                                            contaseña?
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <button
                                                                        type="submit"
                                                                        className={`group relative flex w-full justify-center rounded-md border border-transparent bg-${background}-600 py-2 px-4 text-sm font-medium text-white hover:bg-${background}-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 transition ease-in-out duration-300`}
                                                                        disabled={loading}
                                                                    >
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <LockClosedIcon
                                                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                        {
                                                                            loading === true ? (
                                                                                `${buttonText}`
                                                                            ) : (
                                                                                'Enviar'
                                                                            )
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
