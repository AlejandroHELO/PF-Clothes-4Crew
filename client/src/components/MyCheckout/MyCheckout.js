import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCurrentUser, GetPurchase } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import s from './MyCheckout.module.css'

export default function MyCheckout(){
    const userDetail=useSelector(stata =>stata.userLogged)
    const compras=useSelector(state =>state.compras)
    const dispatch=useDispatch()
    const nav=useNavigate()
    const {user,isAuthenticated,getAccessTokenSilently} = useAuth0()
    const [desplegar, setdesplegar] = React.useState('')
    const [mostrar, setmostrar] = React.useState({})
    React.useEffect(()=>{
        if(userDetail._id){
            console.log(userDetail)
            dispatch(GetPurchase(userDetail._id))
        }else {
            if(isAuthenticated){
                dispatch(getCurrentUser(getAccessTokenSilently, user))
            }
        }
    },[userDetail])

    React.useEffect(()=>{
        dispatch(getProducts())
    })
    
    const onbuton =(e)=>{
        nav('/reviews/'+e.target.id+'/'+userDetail._id)
    }

    const onClickSelect = (b) => {
        if(b.paymentId === mostrar.paymentId){
            setmostrar({})
        }else {
            setmostrar({...b,stateC:b.state})
        }
    }

    return(
        <div className={s.conten}>
            <div className={s.contenlistcompras}>
            { compras&&userDetail._id?compras?.filter(f=>f.userId===userDetail._id)?.map( b => {
                    return(
                        <div className={s.itenlist} key={b.paymentId} onClick={()=>{onClickSelect(b)}}>
                            <span className={s.spans}> #{b.paymentId} </span>
                            { b.state ?
                                <span className={s.spans}> state: {b.state} </span>
                                :
                                null
                            }
                            <hr/>
                        </div>
                    )
                })
            :
                <div
                style={{
                marginTop: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
                >
                    <h1>
                        Please wait  
                    </h1>
                    <ClipLoader color="#ef8354" size={70} margin={10} />
                </div>
            }
            </div>
            <div className={s.contenD}>
                {mostrar.products?mostrar.products?.map((p)=>{
                    return(
                        <div key={p.id} className={s.Dcompra}>
                            <div className={s.contenDcompra}>
                            <img className={s.image} src={p.image[0]} alt=''/>
                            </div>
                            <div className={s.contenDcompra}>
                                <div>
                                <label>name: </label>
                                <span className={s.spans}> {p.name} </span>
                                </div>
                                <div>
                                <label>brand: </label>
                                <span className={s.spans}> {p.brand} </span>
                                </div>
                                <div>
                                <label>color: </label>
                                <span className={s.spans}> color: {p.color} </span>
                                </div>
                                <div>
                                <label>price: </label>
                                <span className={s.spans}> price: {p.price} </span>
                                </div>
                            </div>
                            <div className={s.contenDcompra}>
                            {mostrar.stateC==='Finished'?
                                <button
                                className=" my-10 mx-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                id={p.id}
                                onClick={onbuton}
                                >Reviews</button>:null}
                            </div>
                        </div>
                    )})
                :
                    null
                }
            </div>
        </div>
    )
}