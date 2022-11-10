import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProfile, GetPurchase } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function MyCheckout(){
    const userDetail=useSelector(stata=>stata.userDetail)
    const compras=useSelector(state=>state.compras)
    const dispatch=useDispatch()
    const nav=useNavigate()
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
    const onbuton =(e)=>{
        nav('/products/reviews/'+e.target.id+'/'+userDetail._id)
    }
    return(
        compras?compras?.map(b=>{
            return(
                <div key={b.paymentId}>
                    <h1>id orden: {b.paymentId}</h1>
                    {b.products?.map((p)=>{
                        total=total+p.price
                        return(
                            <div key={p.id}>
                                <img src={p.image[0]} alt=''/>
                                <h1>name: {p.name}</h1>
                                <h1>brand: {p.brand}</h1>
                                <h1>color: {p.color}</h1>
                                <h1>price: {p.price}</h1>
                               {b.state==='Finish'?
                               <button
                               id={p.id}
                               onClick={onbuton}
                               >Reviews</button>:null}
                            </div>
                        )
                    
                    })}
                        <h1>total: {total}</h1>
                     {b.state?<h1>state: {b.state}</h1>:null}
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