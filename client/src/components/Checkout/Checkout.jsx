import React from "react";
import st from '../Admin/User/User.module.css'
import { useDispatch, useSelector } from "react-redux";
import { CreateAddress, GetCart, getprofile, getUsersAddress } from "../../redux/actions";
import {
    PermIdentity,
    AlternateEmail,
    CalendarMonth,
    Wc,
    Public,
    MyLocation,
    PhoneInTalk,
    ManageAccounts,
    DriveFolderUpload,
} from '@mui/icons-material'
import { Select } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import Pago from "../MercadoPago/MercadoPago";

export default function Checkout({id}){
    
    const dispatch= useDispatch()
    let props = useSelector((state) => state.userDetail)
    let address = useSelector((state) => state.address)
    let cart= useSelector((state)=>state.cartDb)
    let total=0;
    const [pasos,setpasos]=React.useState(0)
    const [input,setinput]=React.useState({})
    const [addAddress, setaddAddress]=React.useState('Select')
    if(props.id&&address===''){
        dispatch(getUsersAddress(props.id))
        dispatch(GetCart(props.id))
    }
    console.log(addAddress)
    React.useEffect(() => {
        dispatch(getprofile(id))
    }, [dispatch])
    const onSelect=(e)=>{
        if(e.target.value!=='select')
        setaddAddress(e.target.value)
    }
    const onCreateInput=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }
    console.log(addAddress)
    const addressFilter=(id)=>{
        const result=address.filter(f=>f._id===id)
        return{
            ...result[0]
        }
    }
    const onCreate=(e)=>{
        e.preventDefault()
        const post={
            userId:props.id,
            ...input,
        }

        dispatch(CreateAddress(post))
        
        dispatch(getUsersAddress(props.id))
        setaddAddress('Select')
        
    }
    const onNext=(e)=>{
        e.preventDefault()
        setpasos(pasos+1)
    }
    const onNextSelect=(e)=>{
        e.preventDefault()
        if(addAddress!=='Select')
        setpasos(pasos+1)
    }
    const onBack=(e)=>{
        e.preventDefault()
        setpasos(pasos-1)
    }
    return(
        <div class="grid h-screen place-items-center my-10 mx-10">
        {pasos===0?<div class="content-center">
        <div className={st.userTitleContainer}>
                <h1 className={st.userTitle}>Personal Information</h1>
            </div>

            <div className={st.userContainer}>
                <div className={st.userShow}>
                    <div className={st.userShowTop}>
                        <img
                            src={props.image}
                            alt="Profile Pict"
                            className={st.userShowImg}
                        />
                        <div className={st.userShowTopTitle}>
                            <span className={st.userShowUsername}>
                                {props.fullName}
                            </span>
                        </div>
                    </div>

                    <div className={st.userShowBottom}>
                        <span className={st.userShowTitle}>
                            Account Details
                        </span>

                        <div className={st.userShowInfo}>
                            <AlternateEmail className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                Email: {props.email}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <Wc className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                Genre: {props.genre}
                            </span>
                        </div>

                        <span className={st.userShowTitle}>
                            Contact Details
                        </span>

                        <div className={st.userShowInfo}>
                            <Public className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                Country: {props.country}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <MyLocation className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                Address: {props.address}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <PhoneInTalk className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                Tel: {props.tel}
                            </span>
                        </div>
                        <div className={st.userShowInfo}>
                            <CalendarMonth className={st.userShowIcon} />
                            <span className={st.userShowInfoTitle}>
                                BirthDate: {props.birthDate}
                            </span>
                        </div>
                    </div>
                    <button 
            class=" my-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onNext}>next</button>
                </div>
            
            </div>
            
            
        </div>:
        pasos===1?<div> 
             <div className={st.userTitleContainer}>
                <h1 className={st.userTitle}>Address Information</h1>
            </div>
            <div className={st.userContainer}>
            <div className={st.userShow}>
            <Select name="address" value={addAddress} onChange={onSelect}>
                <MenuItem defaultOpen={true} value='Select'>Select</MenuItem>
                {address.msj||address===''? null:
                address?.map(p=>{
                    
                    return(
                        <MenuItem key={p._id} name={p.street} value={p._id} >{p.street } {p.houseNumber}</MenuItem>
                        )
                    })}
                <MenuItem  value={'create'}>Create Adrress</MenuItem>
            </Select>
            {addAddress==='create'?
                <div>
                    <div className={st.userUpdateItem}>
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>House Number</label>
                        <input
                            type="number"
                            name="houseNumber"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>CP</label>
                        <input
                            type="number"
                            name="cp"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Code Number</label>
                        <input
                            type="number"
                            name="codeNumber"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Phone Number</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            placeholder='Address'
                            className={st.userUpdateInput}
                            onChange={onCreateInput}
                        />
                         <button 
             class=" my-10 mx-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
             onClick={onCreate}>Create</button>
                    </div>
                </div>
            
            :null}
            {addAddress==='Select'?<p>please choose one of the available addresses or create a new address</p>:null}
            {addAddress!=='Select'&&addAddress!=='create'?
                
             
                <div >
                <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                          Street: {addressFilter(addAddress).street}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                     House Number: {addressFilter(addAddress).houseNumber}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                          City: {addressFilter(addAddress).city}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                          Country: {addressFilter(addAddress).country}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                        CP: {addressFilter(addAddress).cp}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                        Code Number: {addressFilter(addAddress).codeNumber}
                     </span>
                 </div>
                 <hr/>
                 <div className={st.userShowInfo}>
                     <span className={st.userShowInfoTitle}>
                        Phone Number: {addressFilter(addAddress).phoneNumber}
                     </span>
                 </div>
                 <br/>
                 
             </div>   
                :null}
            <div class="  place-items-center" >
            <button 
            class="my-10 mx-10 inline-flex justify-center rounded-md border border-solid bg-white-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-#9a9696 focus:outline-none focus:ring-2 focus:ring-#9a9696  focus:ring-offset-2"
            onClick={onBack}>back</button>
            <button 
             class=" my-10 mx-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
             onClick={onNextSelect}>next</button>
             </div>
             </div>
             </div>
        </div>:
        pasos===2?<div class='content-center'>
             <div className={st.userTitleContainer} class="  place-items-center">
                <h1 className={st.userTitle}>Checkout Information</h1>
            </div>
              <div className={st.userContainer}>
            <div className={st.userShow}>
           
                {cart.length?cart[0]?.products?.map(p=>{
                    total=total+(p.price*p.count)
                    return(
                        <div class='my-10'>
                            <img class='w-10 mx-10'
                            src={p.image[0]||''}alt=''/>
                            <span class='mx-10'>
                                Name: {p.name}</span>
                            <span class='mx-10'>
                            Count: {p.count}</span>
                            <span class='mx-10'>
                                Price: {p.price}</span>
                            <br/>
                        </div>
                    )
                        
                    
                }):null}
                <span class='my-10'
                >Total: {total}</span>
                <br/>
                <div class='flex'>

                <button 
            class=" w-24 my-10 mx-10 inline-flex justify-center rounded-md border border-solid bg-white-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-#9a9696 focus:outline-none focus:ring-2 focus:ring-#9a9696  focus:ring-offset-2"
            onClick={onBack}>back</button>
            {props&&addAddress?<Pago  
            id={props.id}
            address={addAddress}
            />:null}
            </div>
            </div>
            </div>
        </div>:<></>}
        
       
        </div>
    )
}