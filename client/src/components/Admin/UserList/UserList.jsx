import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions";
import st from './UserList.module.css';
import {DataGrid} from '@material-ui/data-grid';
import {DeleteForever} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function UserList() {

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getUsers());
  }, [dispatch, getUsers])

  const allUsers = useSelector(state => state.users);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'pic', headerName: 'Pic', width: 100, renderCell: (params)=>{
      return (
        <div className={st.userListUser}>
          <img classname={st.userListPic} src={params.row.pic} alt='' />
          {params.row.name}
        </div>
      )
    }},
    { field: 'idUser', headerName: 'User ID', width: 130 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 120 },
    { field: 'country', headerName: 'Country', width: 135 },
    { field: 'tel', headerName: 'Tel', type: 'number', width: 100 },
    { field: 'active', headerName: 'Active', width: 120 },
    { field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) =>{
      return (
        <>
          <Link to={'/adminView/user/'+ params.row.idUser}>
            <button className={st.userListEdit}>Edit</button>
          </Link>
        </>
      )
    }}
  ];

  const userRows = allUsers.map( (us, index) => ({
    id: index + 1,
    idUser: us.id,
    pic: us.image,
    fullName: us.fullName, 
    email: us.email,
    genre: us.genre, 
    country: us.country,
    tel: us.tel, 
    active: us.active
  }));

  // <div className={st.userTitleContainer}>
  //   <Link to='/adminView/newUser'>
  //     <button className={st.userAddButton}>Create</button>
  //   </Link>
  // </div>

  return (      
  
    <div className={st.userList}>

      <div className={st.userButtonContainer}>
        <Link to='/adminView/newUser'>
          <button className={st.userAddButton}>Create</button>
        </Link>
      </div>

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
};
