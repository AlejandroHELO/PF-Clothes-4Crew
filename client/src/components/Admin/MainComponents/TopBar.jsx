import React from 'react'
import st from './TopBar.module.css'
import { Link } from 'react-router-dom'
import { NotificationsNone, Language, Settings, Logout } from '@mui/icons-material'

import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth0 } from '@auth0/auth0-react'

export default function TopBar() {

    const {logout, user} = useAuth0()
    console.log('SOY EL USER LOGUEADO: ', user)
    // const handleLogOut = async (e) => {
    //     e.preventDefault()
    //     try {
    //         localStorage.removeItem('id')
    //         localStorage.removeItem('token')
    //         window.location.reload(true)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <nav className={st.topbar}>
            <div className={st.topbarWrapper}>
                <div className={st.topLeft}>
                    <Link
                        to='/'
                        className=' no-underline'
                    >
                        <img
                        className={st.logo}
                        src={'/images/clothes4crew.jpg'}
                        alt="Logo Clothes 4Crew"
                        />
                    </Link>
                </div>
                <div className={st.topRight}>
                    <Link
                        to="/adminView/helpusmail"
                        className=' no-underline text-gray-800'
                    >
                        <div className={st.topbarIconsContainer}>
                            <NotificationsNone />
                        </div>
                    </Link>

                    <div className={st.topbarIconsContainer}>
                        <Language />
                    </div>

                    <div className={st.topbarIconsContainer}>
                        <Settings />
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle
                            style={{display:"flex", alignItems: "center"}}
                            variant="#D7FCF1"
                            id="dropdown-basic"
                        >
                            <img
                                src={user.picture || "https://e7.pngegg.com/pngimages/788/424/png-clipart-computer-icons-computer-servers-administrator-miscellaneous-logo.png"}
                                alt="Profile Pic"
                                className={st.topAvatar}
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout}>
                                Sign Out
                            </Dropdown.Item>
                            <Dropdown.Item href="http://www.gmail.com">
                                Gmail
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}
