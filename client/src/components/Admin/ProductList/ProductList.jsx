import React, { useEffect } from 'react'
import st from './ProductList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

export default function ProductList() {

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getProducts());
  }, [dispatch, getProducts])

  const allItems = useSelector(state => state.products);
  console.log('SOY TODOS LOS PRODUCTOS: ', allItems)

  const columns = [
    { field: 'id', headerName: 'ID', width: 92 },
    // { field: 'image', headerName: 'Image', width: 120, renderCell: (params)=>{
    //   return (
    //     <div className={st.productListItem}>
    //       <img classname={st.productListImg} src={params.row.pic} alt='' />
    //       {params.row.name}
    //     </div>
    //   )
    // }},
    { field: 'idProd', headerName: 'Prod. ID', width: 135 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'stock', headerName: 'Total Stock', width: 150 },
    { field: 'category', headerName: 'Category', width: 135 },
    { field: 'active', headerName: 'Active', width: 117 },
    { field: 'actions', headerName: 'Actions', width: 125, renderCell: (params) =>{
      return (
        <>
          <Link to={'/adminView/product/'+ params.row.idProd} style={{"text-decoration": "none"}}>
            <button className={st.productListEdit}>Detail</button>
          </Link>
        </>
      )
    }}
  ];
  
  const itemsRows = allItems.map( (it, index) => ({
    id: index + 1,
    idProd: it._id,
    // image: it.image,
    name: it.name, 
    brand: it.brand.name,
    stock: it.stock,
    category: it.category[0].name,
    active: it.active
  }));
  
  // <div className={st.userTitleContainer}>
  //   <Link to='/adminView/newUser'>
  //     <button className={st.userAddButton}>Create</button>
  //   </Link>
  // </div>

  return (      
  
    <div className={st.productList}>

      <div className={st.productButtonContainer}>
          <Link to='/adminView/newproduct'>
              <button className={st.productAddButton}>Create</button>
          </Link>
      </div>

      <DataGrid
      rows={itemsRows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      disableSelectionOnClick
      />
    </div>
  )
};
