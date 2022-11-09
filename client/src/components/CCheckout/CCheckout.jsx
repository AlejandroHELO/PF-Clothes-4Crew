import React from "react";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function CCheckout(){
    // para obtener los datos luego de hacer la compra
    const {search}= useLocation()
     React.useEffect(()=>{
        const result=search.split('&').map(p=>{
            const resul=p.split('=')
            if(resul[0][0]==='?'){
                const results=resul[0].split('?')
                return{[results[1]]:resul[1]}
            }else{
                return{[resul[0]]:resul[1]}
            }
        })
        console.log('soy las querys',result)
    },[search])
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