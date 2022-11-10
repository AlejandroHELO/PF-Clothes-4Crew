import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProfile, GetPurchase } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

export default function MyCheckout(){
    const userDetail=useSelector(stata=>stata.userDetail)
    const compras=useSelector(state=>state.compras)
    const dispatch=useDispatch()
    const {user,isAuthenticated,getAccessTokenSilently}=useAuth0()
    React.useEffect(()=>{
        if(userDetail){
            dispatch(GetPurchase(userDetail._id))
        }else{
            if(isAuthenticated){
                dispatch(getProfile(getAccessTokenSilently,user))
            }
        }
    },[dispatch])
    React.useEffect(()=>{
        dispatch(getProducts())
    })
    let total=0;
    return(
        compras?compras?.map(p=>{
            return(
                <div>
                    <h1>id orden: {p.paymentId}</h1>
                    {p.products?.map(p=>{
                        total=total+p.price
                        return(
                            <div>
                                <img src={p.image[0]} alt=''/>
                                <h1>name: {p.name}</h1>
                                <h1>brand: {p.brand}</h1>
                                <h1>color: {p.color}</h1>
                                <h1>price: {p.price}</h1>
                               
                            </div>
                        )
                    
                    })}
                        <h1>total: {total}</h1>
                     {p.state?<h1>state: {p.state}</h1>:null}
                </div>
            )
        }):
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
    )
}