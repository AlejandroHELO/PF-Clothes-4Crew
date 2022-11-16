import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getPurchaseDetail, updatePurchase } from '../../../redux/actions'
import './Sales.css'


export default function Sales() {

    const { purchaseId } = useParams() //usar el mismo nombre de variable que en la ruta principal
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getPurchaseDetail(purchaseId))
    }, [purchaseId])

    let purchase = useSelector((state) => state.purchaseDetail)
    // console.log('SOY LA COMPRA: ', purchase)

    const [Purch, setPurch] = useState({})
    // console.log('soy el state: ', Purch)
    const [nav, setNav] = useState(false)

    useEffect(()=>{
        if (purchase[0]) {
            setPurch({    
                ...purchase[0]
            })
        } 
        else console.log('Algo esta pasando en el useEffect')
    }, [purchase])
    // console.log('SOY EL INPUT: ', input)

    const handleChange = (e) => {
        e.preventDefault()
        setPurch((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (e.target.name === 'update') {
            dispatch(updatePurchase(purchaseId, Purch))
            setNav(true)
        }
        //window.location.reload(true)
    }

    const Button = ({ type }) => {
        return <button name="state" value={type} onClick={handleChange} className={`stateButton-${type}`}>{type}</button>
    }

    return (
        <div className="container">
            <h3 className=' text-center'>Purchase Info</h3>
            <div className="purchase">
                <div className="purchaseInfo">
                    
                    <div className="purchaseItem">
                        <span className=' font-medium mr-1 ml-8'>Purchase ID:</span>
                        <span>{Purch._id}</span>
                    </div>

                    <div className="purchaseItem">
                        <span className=' font-medium mr-1 ml-8'>Payment ID:</span>
                        <span>{Purch.paymentId}</span>
                    </div>

                    <div className="purchaseItem">
                        <span className=' font-medium mr-1 ml-8'>User ID:</span>
                        <span>{Purch.userId}</span>
                    </div>

                    <div className="purchaseItem">
                        <span className=' font-medium mr-1 ml-8'>Date:</span>
                        <span>{Purch.time?.slice(0, 10)}</span>
                    </div>

                    <div className="purchaseItem">
                        <span className=' font-medium mr-1 ml-8'>State:</span>
                        <span>{Purch.state}</span>
                    </div>

                    <div className="purchaseItem1">
                        <span className=' font-medium mr-1'>Products:</span>
                        <div> {Purch.products?.map( (P, index) => {
                            return (
                                <div className=' flex flex-col'>
                                    <span className=' font-medium mr-1'>{index + 1}) Product ID: {P.id}</span>
                                    <span> Name: {P.name} </span>
                                    <span> Brand: {P.brand} </span>
                                    <span> Price: {P.price} </span>
                                    <span> Amount: {P.count} </span>
                                </div>
                            )}
                            )}
                        </div>
                    </div>
                   
                </div>

                <div className="purchaseEdit">
                    <span className=' font-medium mr-4'>Modify state:</span>
                    
                    <Button 
                    type={"In-Process"}
                    />
                    <Button 
                    type={"Finished"}
                    />
                    <Button
                    type={"Cancelled"}
                    />
                </div>

                <button name="update" type="button" className="updateButton" onClick={handleUpdate}>Update</button>

            </div>
            {nav ? <Navigate to={'/adminView/sales'} /> : null}
        </div>
    )
}
