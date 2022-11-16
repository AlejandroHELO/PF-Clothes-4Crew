import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser, getCurrentUser } from '../../../redux/actions'
import st from './User.module.css'
import UserEdit from './UserEdit.jsx'
import { useAuth0 } from '@auth0/auth0-react'
import {
    PermIdentity,
    AlternateEmail,
    CalendarMonth,
    Wc,
    Public,
    MyLocation,
    PhoneInTalk,
    ManageAccounts,
    Pin,
} from '@mui/icons-material'

export default function User() {
    const { userId } = useParams() //usar el mismo nombre de variable que en la ruta principal
    const dispatch = useDispatch()
    let userInfo = useSelector((state) => state.userDetail)
   

    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        dispatch(getUser(getAccessTokenSilently, userId))
    }, [getAccessTokenSilently, userId])

    let props = {}

    userInfo._id ? 
    (props = {
        id: userInfo._id,
        fullName: userInfo.fullName,
        email: userInfo.email,
        identificationNumber: userInfo.identificationNumber,
        birthDate: userInfo.birthDate?.slice(0, 10),
        genre: userInfo.genre,
        country: userInfo.country,
        address: userInfo.address,
        tel: userInfo.tel,
        image: userInfo.image,
        isAdmin: String(userInfo.isAdmin),
        active: String(userInfo.active),
    })
    : 
    console.log('Algo esta pasando')

    // console.log('SOY LAS PROPS: ', props)

    return (
        <div className={st.User}>
            <div className={st.userTitleContainer}>
                <h1 className={st.userTitle}>User Account</h1>
            </div>

            <div className={st.userContainer}>
                <div className={st.userShow}>
                    <div className={st.userShowTop}>
                        <img
                            src={props.image}
                            alt="Profile Pict"
                            className={st.userShowImg}
                        />
                        <div className={st.userShowTopTitle}>
                            <span className={st.userShowUsername}>
                                {props.fullName}
                            </span>
                            <span className={st.userShowID}>
                                ID: {props.id}
                            </span>
                        </div>
                    </div>

                    <div className={st.userShowBottom}>
                        <span className={st.userShowTitle}>
                            Account Details
                        </span>

                        <div className={st.userShowInfo}>
                            <AlternateEmail className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Email: {props.email}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <Pin className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                DNI: {props.identificationNumber}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <Wc className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Genre: {props.genre}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <PermIdentity className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Active: {props.active}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <ManageAccounts className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Admin: {props.isAdmin}
                            </span>
                        </div>

                        <span className={st.userShowTitle}>
                            Contact Details
                        </span>

                        <div className={st.userShowInfo}>
                            <Public className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Country: {props.country}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <MyLocation className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Address: {props.address}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <PhoneInTalk className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                Tel: {props.tel}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <CalendarMonth className={st.userShowIcon} />
                            <span className={st.userShowData}>
                                BirthDate: {props.birthDate}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={st.userUpdate}>
                    <UserEdit {...userInfo} />
                </div>
            </div>
        </div>
    )
}
