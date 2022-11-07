import React from 'react'
import Navbar from '../navbar/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { validate } from './validation'
import { SignUpwithPasswwordAndEmail } from '../../redux/actions'

import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

const styled = {
    backgroundColor: 'rgb(225, 0, 0)',
    transition: 'background-color 1s ease-in-out',
}

const dangerSt = {
    border: '1px solid red',
    transition: 'bacground-color, .2s ease-in',
    backgroundColor: 'rgba(255, 0, 0, .25)',
}

function Register() {
    const [input, setInput] = React.useState({
        displayName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: 'Mexico',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        repPassword: '',
    })
    const [style, setStyle] = React.useState({
        ...styled,
    })
    const [danger, setDanger] = React.useState({
        ...dangerSt,
    })

    const [errors, setErrors] = React.useState({})
    // <<<<<<< HEAD
    //     const loggedUser = useSelector(state => state.loggedUser)
    // =======
    // const loggedUser = useSelector(state => state.loggedUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countries = [
        'Mexico',
        'Argentina',
        'United States',
        'Uruguay',
        'Colombia',
        'Canada',
        'Chile',
        'Brazil',
        'Paraguay',
        'Venezuela',
        'Peru',
        'Ecuador',
        'Bolivia',
    ]

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    // <<<<<<< HEAD
    //     React.useEffect(() => {

    //     },[loggedUser])

    //     function handleSubmit(e) {
    //         e.preventDefault()
    //         try {
    //           dispatch(SignUpwithPasswwordAndEmail(input))
    //           navigate('/', ({force: true}))
    //         } catch (error) {
    //           console.log(error)
    //         }

    //     }
    //     return(
    //         <div className="w-full h-screen justify-content-center">
    //             <Navbar />
    // =======

    function handleSubmit(e) {
        e.preventDefault()
        setErrors(() => validate(input))
        try {
            dispatch(SignUpwithPasswwordAndEmail(input))
        } catch (error) {
            throw new Error(error)
        }
    }
    return (
        <div
            className="w-full h-screen justify-content-center"
            style={{ width: '100%' }}
        >
            <div className="w-2/6 h-full flex float-left">
                <img
                    src="/images/img/register.jpeg"
                    alt=""
                    className="h-full object-cover"
                />
            </div>
            <div
                className="w-4/6 h-screen"
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    margin: 'auto',
                }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '100%',
                        }}
                    >
                        <h1 style={{ color: 'rgba(225, 0, 0, .6)' }}>
                            ¡Welcome!
                        </h1>
                    </div>
                    <form
                        action="#"
                        method="POST"
                        onSubmit={(e) => handleSubmit(e)}
                        style={{ backgroundColor: 'rgba(194, 194, 204, 0.5)' }}
                    >
                        <div className="overflow-hidden shadow sm:rounded-md h-full">
                            <div className="bg-white px-4 py-5 sm:p-6 h-full">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.firstName}`}
                                            onChange={(e) => handleChange(e)}
                                            value={input.firstName}
                                            style={{
                                                border: '1px solid rgba(0, 0, 0, .2)',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            autoComplete="family-name"
                                            onChange={(e) => handleChange(e)}
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.lastName}`}
                                            value={input.lastName}
                                            style={{
                                                border: '1px solid rgba(0, 0, 0, .2)',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2 w-full">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address*
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            onChange={(e) => handleChange(e)}
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email}`}
                                            style={
                                                (errors.email && {
                                                    ...danger,
                                                }) ||
                                                (!errors.email && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            value={input.email}
                                        />
                                        {errors.email && (
                                            <p style={{ color: 'red' }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-2 w-full">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password*
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="off"
                                            onChange={(e) => handleChange(e)}
                                            style={
                                                (errors.password && {
                                                    ...danger,
                                                }) ||
                                                (!errors.password && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.password}`}
                                            value={input.password}
                                        />
                                        {errors.password && (
                                            <p style={{ color: 'red' }}>
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-2">
                                        <label
                                            htmlFor="repPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Repeat your password*
                                        </label>
                                        <input
                                            type="password"
                                            name="repPassword"
                                            id="repPassword"
                                            autoComplete="off"
                                            onChange={(e) => handleChange(e)}
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.repPassword}`}
                                            value={input.repPassword}
                                            style={
                                                (errors.repPassword && {
                                                    ...danger,
                                                }) ||
                                                (!errors.repPassword && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                        />
                                        {errors.repPassword && (
                                            <p style={{ color: 'red' }}>
                                                {errors.repPassword}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Country*
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            onChange={(e) => handleChange(e)}
                                            autoComplete="country-name"
                                            value={input.country}
                                            style={
                                                (errors.country && {
                                                    ...danger,
                                                }) ||
                                                (!errors.country && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            className={`mt-1 block w-full rounded-md border border-gray-700 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${errors.country}`}
                                        >
                                            {countries.map((c) => {
                                                return (
                                                    <option
                                                        key={c}
                                                        value={`${c}`}
                                                    >
                                                        {c}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        {errors.country && (
                                            <p style={{ color: 'red' }}>
                                                {errors.country}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-3">
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Street address*
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={input.address}
                                            style={
                                                (errors.address && {
                                                    ...danger,
                                                }) ||
                                                (!errors.address && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            autoComplete="street-address"
                                            onChange={(e) => handleChange(e)}
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.address}`}
                                        />
                                        {errors.address && (
                                            <p style={{ color: 'red' }}>
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-3 sm:col-span-6 lg:col-span-2">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            City*
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            style={
                                                (errors.city && {
                                                    ...danger,
                                                }) ||
                                                (!errors.city && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            value={input.city}
                                            onChange={(e) => handleChange(e)}
                                            autoComplete="address-level2"
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.city}`}
                                        />
                                        {errors.city && (
                                            <p style={{ color: 'red' }}>
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            State / Province*
                                        </label>
                                        <input
                                            type="text"
                                            style={
                                                (errors.state && {
                                                    ...danger,
                                                }) ||
                                                (!errors.state && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            name="state"
                                            onChange={(e) => handleChange(e)}
                                            value={input.state}
                                            id="region"
                                            autoComplete="address-level1"
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.state}`}
                                        />
                                        {errors.state && (
                                            <p style={{ color: 'red' }}>
                                                {errors.state}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            ZIP / Postal code*
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            style={
                                                (errors.zipCode && {
                                                    ...danger,
                                                }) ||
                                                (!errors.zipCode && {
                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                })
                                            }
                                            onChange={(e) => handleChange(e)}
                                            id="postal-code"
                                            value={input.zipCode}
                                            autoComplete="postal-code"
                                            className={`mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.zipCode}`}
                                        />
                                        {errors.zipCode && (
                                            <p style={{ color: 'red' }}>
                                                {errors.zipCode}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    type="submit"
                                    onMouseEnter={() =>
                                        setStyle({
                                            ...styled,
                                            backgroundColor:
                                                'rgba(255,25,25,.6',
                                        })
                                    }
                                    onMouseLeave={() =>
                                        setStyle({
                                            ...styled,
                                            backgroundColor: 'rgb(225, 0, 0)',
                                        })
                                    }
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    style={style}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register
