import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Clou from "../ImageCloudinary/ImageCloudinary";
// import { DriveFolderUpload } from '@mui/icons-material'
import st from './UserProfileEdit.module.css'
import { editUser } from '../../redux/actions.js'

export default function UserEdit({changePage}) {

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userDetail)

    let info = {}

    userInfo._id ?
        info = {
            id: userInfo._id,
            fullName: userInfo.fullName,
            email: userInfo.email,
            identificationNumber: userInfo.identificationNumber,
            birthDate: userInfo.birthDate,
            genre: userInfo.genre,
            country: userInfo.country,
            address: userInfo.address,
            tel: userInfo.tel,
            image: userInfo.image,
            active: userInfo.active,
        }
    : console.log('Algo esta pasando')
    // console.log('SOY LA INFOOO: ', info)

    const [input, setInput] = useState({})

    // const [nav, setNav] = useState(false)

    useEffect(()=>{
        userInfo._id?
        setInput({    
            ...userInfo
        })
        : console.log('Algo esta pasando en el useEffect')
    }, [])

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
            dispatch(editUser(info.id, input))
            // setNav(true)
            window.location.reload(true)
            changePage()
        }
    }


    return (
        <div className={st.userUpdate}>
            <h4 className=' text-center mb-10'>Edit profile</h4>
            <form onSubmit={handleUpdate} className={st.userUpdateForm}>

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

                <div className={st.userInputs}>
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
                            disabled
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>DNI</label>
                        <input
                            type="number"
                            name="identificationNumber"
                            placeholder={info.identificationNumber}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
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
                                {info.genre}
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
                        <label>Phone</label>
                        <input
                            type={"tel"}
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
                    
                </div>
                <div className=' flex justify-around'>
                    <button
                        onClick={changePage}
                        className=' w-28 h-14 p-2 font-medium bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                        >
                        {"<<--- Back"}
                    </button>
                    <button
                        name="update"
                        onClick={handleUpdate}
                        className=' w-28 h-14 p-2 font-medium bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                        >
                        Update
                    </button>
                </div>
            </form>

            {/* {nav ? <Navigate to={`/profile/${info.id}`} /> : null} */}
        </div>
    )
}
