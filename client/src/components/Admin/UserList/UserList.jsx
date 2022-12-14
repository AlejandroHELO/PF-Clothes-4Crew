import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../redux/actions'
import st from './UserList.module.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteForever } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function UserList() {
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useDispatch()
    const userLogged = useSelector(state=>state.userLogged)


    useEffect(() => {
        dispatch(getUsers(getAccessTokenSilently ,userLogged._id))
    }, [getUsers, userLogged])

    const allUsers = useSelector((state) => state.users)

    const columns = [
        { field: 'id', headerName: 'ID', width: 92 },
        {
            field: 'pic',
            headerName: 'Photo',
            width: 115,
            renderCell: (params) => {
                return (
                    <div className={st.userListUser}>
                        <img
                            className={st.userListPic}
                            src={params.row.pic}
                            alt=""
                        />
                        {params.row.name}
                    </div>
                )
            },
        },
        { field: 'idUser', headerName: 'User ID', width: 130 },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'tel', headerName: 'Tel', type: 'number', width: 100 },
        { field: 'active', headerName: 'Active', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={'/adminView/user/' + params.row.idUser}
                            className=' no-underline'
                        >
                            <button className={st.userListEdit}>Detail</button>
                        </Link>
                    </>
                )
            },
        },
    ]

    const userRows = allUsers.map((us, index) => ({
        id: index + 1,
        idUser: us.id,
        pic: us.image,
        fullName: us.fullName,
        email: us.email,
        genre: us.genre,
        country: us.country,
        tel: us.tel,
        active: us.active,
    }))

    // <div className={st.userTitleContainer}>
    //   <Link to='/adminView/newUser'>
    //     <button className={st.userAddButton}>Create</button>
    //   </Link>
    // </div>

    return (
        <div className={st.userList}>
            {/* <div className={st.userButtonContainer}>
                <Link to="/adminView/newuser">
                    <button className={st.userAddButton}>Create</button>
                </Link>
            </div> */}

            <DataGrid
                rows={userRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}
