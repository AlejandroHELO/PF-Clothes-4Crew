import React from "react";
import Navbar from "../navbar/navbar";
import {useDispatch, useSelector} from 'react-redux'

import {useNavigate} from 'react-router-dom'
import Footer from "../Footer/Footer";



function Register() {
    const [input, setInput] = React.useState({
        displayName: '',
        firstName:'',
        lastName:'',
        email: '',
        password: '',
        country: '',
        address: '',
        city: '',
        state: '',
        zipCode:''

    })
    // const loggedUser = useSelector(state => state.loggedUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
   

    function handleSubmit(e) {
        e.preventDefault()
        // try {
        //   dispatch(SignUpwithPasswwordAndEmail(input))
        //   navigate('/', ({force: true}))
        // } catch (error) {
        //   console.log(error)
        // }

    }
    return(
      <div className="w-full h-screen justify-content-center">
     
        <div className="w-2/6 h-full flex float-left">
          <img src='/images/img/register.jpeg' alt='' className="h-full object-scale" />
        </div>
        <div className="flex justify-self-end w-4/6 h-screen content-center">
          <div className="mt-5 md:col-span-2 md:mt-0 w-full h-full ">
           <div className='w-full h-fit text-center'>
           <h1>¡Welcome!</h1>
           </div>
            <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
              <div className="overflow-hidden shadow sm:rounded-md h-full">
                <div className="bg-white px-4 py-5 sm:p-6 h-full">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => handleChange(e)}
                        value={input.firstName}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        onChange={(e) => handleChange(e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={input.lastName}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        onChange={(e) => handleChange(e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={input.email}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                       Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={input.password}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        onChange={(e) => handleChange(e)}
                        autoComplete="country-name"
                        value={input.country}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={input.address}
                        autoComplete="street-address"
                        onChange={(e) => handleChange(e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={input.city}
                        onChange={(e) => handleChange(e)}
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        onChange={(e) => handleChange(e)}
                        value={input.state}
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        onChange={(e) => handleChange(e)}
                        id="postal-code"
                        value={input.zipCode}
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    )
}



export default Register
