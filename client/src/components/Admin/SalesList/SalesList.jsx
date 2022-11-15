import React, { useEffect } from 'react'
import st from './SalesList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases } from '../../../redux/actions'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'

export default function SalesList() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchases())
    }, [getPurchases])

    const allSales = useSelector((state) => state.purchases)
    // console.log('SOY TODAS LAS VENTAS: ', allSales)

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
        { field: 'idPurchase', headerName: 'Purchase ID', width: 210 },
        { field: 'idUser', headerName: 'User ID', width: 210 },
        { field: 'products', headerName: 'Products', width: 140 },
        { field: 'date', headerName: 'Date', width: 135 },
        { field: 'state', headerName: 'State', width: 120 },
        { field: 'actions', headerName: 'Actions', width: 125, renderCell: (params) => {
            return (
                <>
                    <Link
                        to={'/adminView/sales/' + params.row.idPurchase}
                        className=' no-underline'
                    >
                        <button className={st.salesListEdit}>
                            Details
                        </button>
                    </Link>
                </>
            )
            },
        },
    ]

    const itemsRows = allSales.map((sale, index) => ({
        id: index + 1,
        idPurchase: sale._id,
        idUser: sale.userId,
        products: sale.products.length,
        date: sale.time.slice(0, 10),
        state: sale.state,
    }))

    return (
        <div className={st.salesList}>
        
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
}

