import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Clou from "../../ImageCloudinary/ImageCloudinary";
// import { DriveFolderUpload } from '@mui/icons-material'
import st from './UserEdit.module.css'
import { editUserAdmin } from '../../../redux/actions'

export default function UserEdit() {
    // console.log('HOLA SOY PROPS', props)
    const dispatch = useDispatch()

    const userInfo = useSelector( (state) => state.userDetail)

    let info = {}

    userInfo.id ?
        info = {
            id: userInfo.id,
            fullName: userInfo.fullName,
            email: userInfo.email,
            birthDate: userInfo.birthDate,
            genre: userInfo.genre,
            country: userInfo.country,
            address: userInfo.address,
            tel: userInfo.tel,
            image: userInfo.image,
            isAdmin: userInfo.isAdmin,
            active: userInfo.active,
        }

    : console.log('Algo esta pasando')
    // console.log('SOY LA INFOOO: ', info)

    const [input, setInput] = useState({})

    const [nav, setNav] = useState(false)

    useEffect(()=>{
        userInfo.id?
        setInput({    
            ...userInfo
        })
        : console.log('Algo esta pasando en el useEffect')
    }, [userInfo])

    // console.log('SOY EL INPUT: ', input)

    const handleChange = (e) => {
        e.preventDefault()
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        if (e.target.name === 'update') {
            dispatch(editUserAdmin(info.id, input))
            setNav(true)
        }
        //window.location.reload(true)
    }


    return (
        <div className={st.userUpdate}>
            <span className={st.userUpdateTitle}>Edit</span>
            <form onSubmit={handleUpdate} className={st.userUpdateForm}>
                <div className={st.userUpdateLeft}>
                    <div className={st.userUpdateItem}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder={info.fullName}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={info.email}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Active</label>
                        <select
                            name="active"
                            defaultValue=""
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden value="">
                                Select a status
                            </option>
                            <option name="true" value="true">
                                Active
                            </option>
                            <option name="false" value="false">
                                Disabled
                            </option>
                        </select>
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Genre</label>
                        <select
                            name="genre"
                            defaultValue=""
                            className={st.userUpdateInput}
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
                    <div className={st.userUpdateItem}>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            placeholder={info.country}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder={info.address}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Tel</label>
                        <input
                            type="tel"
                            name="tel"
                            placeholder={info.tel}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>BirthDate</label>
                        <input
                            type="date"
                            name="birthDate"
                            // value={input.birthDate}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Is an admin?</label>
                        <div className={st.newUserIsAdm}>
                            <label>True</label>
                            <input
                                type={'radio'}
                                name="isAdmin"
                                id="true"
                                value={true}
                                className={st.userUpdateInputRadio}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>False</label>
                            <input
                                type={'radio'}
                                name="isAdmin"
                                id="false"
                                value={false}
                                className={st.userUpdateInputRadio}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className={st.userUpdateRight}>
                    <div className={st.userUpdateUpload}>
                        <img
                            className={st.userUpdateImg}
                            src={info.image}
                            alt="Profile Pic"
                        />
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
                    <button
                        name="update"
                        onClick={handleUpdate}
                        className={st.userUpdateBotton}
                    >
                        Update
                    </button>
                </div>
            </form>
            {nav ? <Navigate to={'/adminView/users'} /> : null}
        </div>
    )
}
