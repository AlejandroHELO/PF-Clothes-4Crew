import React, { useEffect } from 'react';
import { useParams } from  'react-router-dom';


function ProductDetail() {
   const { productId } = useParams()   

   React.useEffect(() => {
    console.log(productId)
   }, [productId])
    
    return( 
        <div >
            
        </div>
    )
    
}


export default ProductDetail