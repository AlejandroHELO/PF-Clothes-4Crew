import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CreatePurchase,cartEmpty } from "../../redux/actions";
import { DELETE_CREATE_PORCHASE } from "../../redux/types";

export default function CCheckout(){
    // para obtener los datos luego de hacer la compra
    const {search}= useLocation()
    const {id}=useParams()
    const userDetail=useSelector(state=>state.userLogged)
    const createP=useSelector(state=>state.createP)
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    const nav=useNavigate()
    let resultado;
    const [vali,setvalid]=React.useState('false')
    let [obj ,setobj]=React.useState({
        paymentId:'',
        userId:'',
        products:'',
        addresId:'',
        })
        
    React.useEffect(()=>{
        if(createP.msj){
            setvalid('true')
        }
        if(obj.addresId&&obj.paymentId&&obj.products.length&&obj.userId&&vali==='false'){
            setvalid('ya esta')
            dispatch({
                type:DELETE_CREATE_PORCHASE,
                payload:''
            })
            localStorage.setItem('cart', JSON.stringify([]))
            dispatch(cartEmpty())
            dispatch(CreatePurchase(obj))
            setobj({...obj,
                paymentId:'',
                addresId:'',
                userId:'',
                products:''
            })
        }
        if(createP.msj==='purchase create'){
            nav('/mycheckout')
        }
    },[dispatch,obj,createP])
    
//    console.log('soy el resultado ',resultado.get('payment_id'))
//    console.log('soy el userDetail ',userDetail)
//    console.log('soy el createP ',createP)
//    console.log('soy el id ',id)
//    console.log('soy el cart ',cart)
    React.useEffect(()=>{
        resultado= new URLSearchParams(search)
        //console.log('soy las querys',resultado)
        if(resultado.get('payment_id')&&id&&userDetail._id&&cart.length){
            if(!obj.addresId&&!obj.paymentId&&!obj.products.length&&!obj.userId&&vali==='false'){
                setobj({...obj,
                    paymentId:resultado.get('payment_id'),
                    addresId:id,
                    userId:userDetail._id,
                    products:cart
                })
            }
        }
    },[search,resultado,userDetail,cart,createP])
    
    return(
        (
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
    )
}