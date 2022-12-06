import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import st from './NewUser.module.css'
import { useDispatch } from 'react-redux'
import Clou from "../../ImageCloudinary/ImageCloudinary";
import { createUser } from '../../../redux/actions'

export default function NewUser() {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullName: '',
        email: '',
        password: '',
        genre: '',
        birthDate: '',
        country: '',
        address: '',
        tel: '',
        isAdmin: false,
        image: '',
    })

    const [nav, setNav] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleCreate = (e) => {
        if (e.target.name === 'create'){
            dispatch(createUser(input))
            //window.location.reload(true)
            setNav(true)
        }
    }

    return (
        <div className={st.newUser}>
            <h1 className={st.newUserTitle}>New User</h1>
            <div className={st.newUserForm}>
                <div className={st.newUserItem}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Name here"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Email</label>
                    <input
                        type={'email'}
                        name="email"
                        placeholder="Email here"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Password</label>
                    <input
                        type={'password'}
                        name="password"
                        placeholder="XXXXXXXXX"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Genre</label>
                    <select
                        name="genre"
                        defaultValue=""
                        onChange={(e) => handleChange(e)}
                    >
                        <option hidden value="">
                            Select a genre
                        </option>
                        <option name="Male" value="Male">
                            Male
                        </option>
                        <option name="Female" value="Female">
                            Female
                        </option>
                        <option name="Transgender" value="Transgender">
                            Transgender
                        </option>
                        <option name="Not defined" value="Not defined">
                            Not Defined
                        </option>
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Birthdate</label>
                    <input
                        type={'date'}
                        name="birthDate"
                        placeholder="Name here"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Ex: Canadá"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Ex: St 55 #10-90"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Phone</label>
                    <input
                        type={'tel'}
                        name="tel"
                        placeholder="Ex: 8887788"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Is an admin?</label>
                    <div className={st.newUserIsAdm}>
                        <label>True</label>
                        <input
                            type={'radio'}
                            name="isAdmin"
                            id="true"
                            value={true}
                            className={st.newUserRadius}
                            onChange={(e) => handleChange(e)}
                        />
                        <label>False</label>
                        <input
                            type={'radio'}
                            name="isAdmin"
                            id="false"
                            value={false}
                            className={st.newUserRadius}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className={st.newUserItem}>
                    <label>Image</label>
                    <div className={st.userUpdateUpload}>
                        {/* <img
                            className={st.userUpdateImg}
                            src=""
                            alt="Profile Pic"
                        /> */}
                        <label htmlFor="file">
                            {/* <DriveFolderUpload className={st.userUpdateIcon} /> */}
                            <Clou
                            setEditInput={setInput}
                            editInput={input}
                            /> 
                        </label>
                        <input
                            name="image"
                            type="file"
                            id="file"
                            style={{ display: 'none' }}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <button
                    name="create"
                    onClick={handleCreate}
                    className={st.createNewUser}
                >
                    Create
                </button>
            </div>
            {nav ? <Navigate to={'/adminView/users'} /> : null}
        </div>
    )
}
